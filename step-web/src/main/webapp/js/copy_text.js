window.step = window.step || {};
step.copyText = {

	initVerseSelect: function() {
		step.util.closeModal('searchSelectionModal');
		step.util.closeModal('passageSelectionModal');
		this._displayVerses();
	},

	_displayVerses: function() {
    $('#bookchaptermodalbody').empty();
		var html = this._buildHeaderAndSkeleton();
		$('#bookchaptermodalbody').append(html);
		$('#bookchaptermodalbody').append(this._buildChptrVrsTbl(-1));
	},


	_buildHeaderAndSkeleton: function(summaryMode) {
		var html = '<div class="header" style="overflow-y:auto">' +
			'<h4>Please select the first version to copy</h4>';
			//'<h4>' + __s.please_select_book + '</h4>';
		return html;
	},

	goCopy: function(firstVerseIndex, lastVerseIndex) {
		var passageContainer = step.util.getPassageContainer(step.util.activePassageId());
		var copyOfPassage = $(passageContainer).find(".passageContentHolder").clone();
		if (firstVerseIndex > lastVerseIndex) {
			var temp = firstVerseIndex;
			firstVerseIndex = lastVerseIndex;
			lastVerseIndex = temp;
		}
		var verses = $(copyOfPassage).find('.versenumber');
		if (lastVerseIndex < verses.length - 1) {
			for (var k = verses.length - 1; k > lastVerseIndex; k--) {
				var found = false;
				var count = 0;
				var parent = $(verses[k]).parent();
				while ((!found) && (count < 6)) {
					if ((parent.hasClass("verse")) || (parent.hasClass("row")) || (parent.hasClass("verseGrouping"))) {
						parent.remove();
						found = true;
					}
					else parent = parent.parent();
					count ++;
				}
			}
		}
		if (firstVerseIndex > 0) {
			for (var k = firstVerseIndex -1; k >= 0; k--) {
				var found = false;
				var count = 0;
				var parent = $(verses[k]).parent();
				while ((!found) && (count < 6)) {
					if ((parent.hasClass("verse")) || (parent.hasClass("row")) || (parent.hasClass("verseGrouping"))) {
						parent.remove();
						found = true;
					}
					else parent = parent.parent();
					count ++;
				}
			}
		}

		$(copyOfPassage).find('.notesPane').remove()
		$(copyOfPassage).find('.note').remove();
		if ($(copyOfPassage).find('.verseGrouping').length == 0)
			$(copyOfPassage).find('.heading').remove();
		else {
			$(copyOfPassage).find('.heading').prepend("<br>");
			var singleVerses = $(copyOfPassage).find('.singleVerse');
			for (var i = 0; i < singleVerses.length; i ++) {
				$(singleVerses[i]).html( $(singleVerses[i]).html().replace(/(>\(\w{2,8}\))\n/, "$1") );
			}
			$(singleVerses).prepend("<br>");
		}
		$(copyOfPassage).find(".stepButton").remove();
		$(copyOfPassage).find(".level2").text("\t");
		$(copyOfPassage).find('.startLineGroup').replaceWith("<br>")
		$(copyOfPassage).find("p").replaceWith("<br>")
		if ($(copyOfPassage).find('.headingVerseNumber').length > 0)
			$(copyOfPassage).find('.headingVerseNumber').prepend("<br>")
		var interlinearClasses = $(copyOfPassage).find('.interlinear');
		for (var j = 0; j < interlinearClasses.length; j++) {
			if ($($(interlinearClasses[j]).find(".interlinear")).length == 0) {
				var text = $(interlinearClasses[j]).text();
				if (text.indexOf("[") > -1) continue;
				text = text.replace(/\s/g, "").replace(/&nbsp;/g, "");
				if (text.length == 0) continue;
				$(interlinearClasses[j]).prepend(" [").append("] ");
			}
		}
		var textToCopy = $($(copyOfPassage).html().replace(/<br\s*[\/]?>/gi, "\r\n")).text().replace(/    /g, " ")
			.replace(/   /g, " ").replace(/  /g, " ").replace(/(\d)([A-Za-z])/g, "$1 $2").replace(/\t /g, "\t")
			.replace(/\n\s+\n/g, "\n\n").replace(/\n\n\n/g, "\n\n");
		if ($(copyOfPassage).find('.verseGrouping').length > 0) {
			textToCopy = textToCopy.replace(/\n\n/g, "\n");
		}
		if (interlinearClasses.length > 0)
			textToCopy = textToCopy.replace(/\s+/g, " ");

		var versionsString = step.util.activePassage().get("masterVersion") + "," + step.util.activePassage().get("extraVersions");
		var versions = versionsString.split(",");
		for (var i = 0; i < versions.length; i++) {
			currentVersion = versions[i];
			if (currentVersion === "") continue;
			$.ajaxSetup({async: false});
			$.getJSON("/html/copyrights/" + currentVersion + ".json", function(copyRights) {
				if (i == 0) textToCopy += "\n";
				textToCopy += "\n" + copyRights;
			});
			$.ajaxSetup({async: true});
		}
		var previousCopyTimeStamps = $.cookie("step.copyTimeStamps");
		var currentTimeInSeconds =  Math.floor( new Date().getTime() / 1000 );
		var timeStampForNewCookie = currentTimeInSeconds.toString();
		var copiesInLastMinute = 0;
		if ((previousCopyTimeStamps != null) && (typeof previousCopyTimeStamps === "string")) {
			previousTimes = previousCopyTimeStamps.split(",");
			for (var j = 0; j < previousTimes.length; j ++) {
				if (previousTimes[j] === "") continue;
				if (currentTimeInSeconds - previousTimes[j] > 60) continue;
				timeStampForNewCookie += "," + previousTimes[j];
				copiesInLastMinute ++;
			}
		}
		$.cookie("step.copyTimeStamps", timeStampForNewCookie);
		if (copiesInLastMinute > 4) {
			alert("You are copying in a rapid pace. Consider slowing down.\n\nThe copy function is intended for personal use within the copyrights limitation.  Please review the copyrights requirement for the Bibles (" +
				versionsString +
				") you are using.");
		}
		navigator.clipboard.writeText(textToCopy);
		$('#bookchaptermodalbody').empty();
		$('#bookchaptermodalbody').append("<h2>The text is copied to the clipboard.");
		setTimeout( function() { step.util.closeModal("copyModal")}, 1000);
	},

	_buildChptrVrsTbl: function(firstSelection) {
		var verses = $('.versenumber');
		var headerMsg = (firstSelection == -1) ? "Select the <i>first</i> verse to copy" : "Copy will start from verse: " + $(verses[firstSelection]).text() + "<br>Select the <i>last</i> verse to copy.  If you only want to copy one verse, select the same verse again.";
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
		var previousVerseName = "";
		for (var i = 0; i < verses.length; i++) {
			chptrOrVrsNum++;
			var verseName = $(verses[i]).text();
			var originalVerseName = verseName;
			var verseSplit = verseName.split(/:/);
			if ((verseSplit.length == 2) && (verseSplit[0] === previousVerseName.split(/:/)[0])) verseName = verseSplit[1];
			else {
				verseSplit = verseName.split(/ /);
				if ((verseSplit.length == 2) && (verseSplit[0] === previousVerseName.split(/ /)[0])) verseName = verseSplit[1];
			}
			previousVerseName = originalVerseName;
			
			if (firstSelection > -1) {
				if (i == firstSelection) verseName = "<b><i>" + verseName + "</i></b>";
				html += '<td><a href="javascript:step.copyText.goCopy(' + firstSelection + ',' + i + ');"' +
					'>' + verseName + 
					'</a></td>'
			}
			else html += '<td><a href="javascript:step.copyText._buildChptrVrsTbl(' + i + ');"' +
					'>' + verseName + 
					'</a></td>'
			if ((chptrOrVrsNum > (tableColumns - 1)) && ((chptrOrVrsNum % tableColumns) == 0)) {
				html += '</tr><tr>';
			}
		}
		html +=
			'</tr></table></div>' +
			'</div>';
		$('#bookchaptermodalbody').empty();
		$('#bookchaptermodalbody').append(html);
	}
};