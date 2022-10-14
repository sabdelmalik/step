window.step = window.step || {};
step.copyText = {

	initVerseSelect: function() {
		step.util.closeModal('searchSelectionModal');
		step.util.closeModal('passageSelectionModal');
		this._displayVerses();
	},

	_displayVerses: function() {
    $('#versesbody').empty();
		var html = this._buildHeaderAndSkeleton();
		$('#versesbody').append(html);
		$('#versesbody').append(this._buildChptrVrsTbl(40));
	},


	_buildHeaderAndSkeleton: function(summaryMode) {
		var html = '<div class="header" style="overflow-y:auto">' +
			'<h4>Please select the first version to copy</h4>';
			//'<h4>' + __s.please_select_book + '</h4>';
		return html;
	},

	_buildBookTableHeader: function() {
		var columns  = 10;
		var columnPercent = Math.floor(100 / columns);
		html = '<table>' +
			'<colgroup>';
		for (var i = 0; i < columns; i++) {
			html += '<col span="1" style="width:' + columnPercent + '%;">';
		}
		html += '</colgroup>';
		html += '<tr>';
		return html;
	},

	goToPassage: function(osisID, chptrOrVrsNum) {
		var bookID = osisID.substring(0, osisID.indexOf("."));
		if (bookID === "") bookID = osisID;
		if ((chptrOrVrsNum != 0) && ($("#select_verse_number").hasClass("checked")) && 
			(this.modalMode === "chapter")) {
			var numOfVerse = 0;
			for (var i = 0; i < this.osisChapterJsword.length; i++) {
				var currentOsisID = (this.osisChapterJsword[i].length === 4) ? this.osisChapterJsword[i][3] : this.osisChapterJsword[i][0];
				if (bookID === currentOsisID) {
					numOfVerse = this.osisChapterJsword[i][2][Math.abs(chptrOrVrsNum)-1] || 0; // -1 is used for books with 1 chapter (e.g.: Jude)
					break;
				}
			}
			if (numOfVerse > 0) {
				this._buildChptrVrsTbl(null, osisID, numOfVerse, false);
				return;
			}
			else alert('Cannot determine the number of verse in ' + osisID + '.  Will proceed to display the chapter.');
		}
		var activePassageData = step.util.activePassage().get("searchTokens") || [];
		var allVersions = "";
		var existingReferences = "";
		var selectedDisplayLoc = $( "#displayLocation option:selected" ).val();
		for (var i = 0; i < activePassageData.length; i++) {
			if (activePassageData[i].itemType == "version") {
				if (allVersions.length > 0) allVersions += "|version=";
				allVersions += activePassageData[i].item.shortInitials;
			}
			else if ((selectedDisplayLoc === "append") && (activePassageData[i].itemType == "reference")) {
				existingReferences += "|reference=" + activePassageData[i].item.osisID;
			}
		}
		step.util.closeModal('passageSelectionModal');
		if (selectedDisplayLoc === "append") {
			var url = VERSION + '=' + allVersions + existingReferences + '%7C' + REFERENCE + '=' + osisID;
			step.router.navigateSearch(url, true, true); // skip QFilter
		}
		else {
			if (selectedDisplayLoc === "new") {
				step.util.createNewColumn();
			}
			if (this.modalMode === "verse") {
				ap=step.util.activePassage();
				var numOfChaptersInBook = this.getNumOfChapters(bookID);
				if (numOfChaptersInBook === 1) {
					var tmpOsisID = osisID.substring(0, osisID.indexOf(".")) + '.1.' + osisID.substring(osisID.indexOf(".") + 1);
					ap.save({targetLocation: tmpOsisID}, {silent: true});
				}
				else ap.save({targetLocation: osisID}, {silent: true});
				osisID = osisID.substring(0, osisID.lastIndexOf('.'));
			}
			step.router.navigatePreserveVersions("reference=" + osisID, false, true, true);
		}
	},

	getNumOfChapters: function(bookID) {
		for (var i = 0; i < this.osisChapterJsword.length; i++) {
			var currentOsisID = (this.osisChapterJsword[i].length === 4) ? this.osisChapterJsword[i][3] : this.osisChapterJsword[i][0];
			if (bookID === currentOsisID) {
				return this.osisChapterJsword[i][1];
			}
		}
	},

	_buildChptrVrsTbl: function(numOfChptrsOrVrs) {
		var headerMsg;
		headerMsg = __s.please_select_verse;
		this.modalMode = 'verse';
		var tableColumns = 10;
		var widthPercent = 10;
		if (step.touchDevice) {
			var ua = navigator.userAgent.toLowerCase();
			if ( (ua.indexOf("android") > -1) ||
				 (((ua.indexOf("ipad") > -1) || (ua.indexOf("iphone") > -1)) &&
					(ua.indexOf("safari/60") > -1)) ) {
				tableColumns = 7;
				widthPercent = 14;
			}
		}
    var chapterDescription = [];
		var html = '<div class="header">' +
            '<h4>' + headerMsg + '</h4>';
    html +=
            '</div>' +
			'<div style="overflow-y:auto">' +
			'<table>' +
			'<colgroup>';
		for (var c = 0; c < tableColumns; c++) {
			html += '<col span="1" style="width:' + widthPercent + '%">';
		}
		html += '</colgroup>' +
			'<tr>';

		var chptrOrVrsNum = 0;
		var osisIDLink = "";
		if (numOfChptrsOrVrs > 0) {
			for (var i = 0; i < numOfChptrsOrVrs; i++) {
				chptrOrVrsNum++;
				var curChptrDesc = "";
				if (typeof chapterDescription[chptrOrVrsNum] === "string")
					curChptrDesc = " - " + chapterDescription[chptrOrVrsNum];
				html += '<td><a href="javascript:step.passageSelect.goToPassage(\'' + osisIDLink + '\', \'' + chptrOrVrsNum + '\');"' +
                    '>' + chptrOrVrsNum + 
                    '</a></td>'
				if ((chptrOrVrsNum > (tableColumns - 1)) && ((chptrOrVrsNum % tableColumns) == 0)) {
					html += '</tr><tr>';
				}
			}
		}
		html +=
			'</tr></table></div>' +
			'</div>';
		$('#versesbody').empty();
		$('#versesbody').append(html);
	}
};