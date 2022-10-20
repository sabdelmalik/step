window.step = window.step || {};
step.copyText = {

	initVerseSelect: function() {
		var verses = $('.versenumber');
		// if (verses.length == 0) {
		// 	alert("Cannot copy without verse numbers");
		// 	step.util.closeModal('copyModal');
		// 	return;
		// }
		step.util.closeModal('searchSelectionModal');
		step.util.closeModal('passageSelectionModal');
		this._displayVerses();
		if (step.util.activePassage().get("extraVersions") !== "") { // notes and Xref for more than one version is confusing so don't offer the choice.
			$("#includeNotes").hide();
			$("#includeXRefs").hide();
		} 
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
		if (verses.length == 0) verses = $(copyOfPassage).find('.verselink');
		var versesRemoved = 0;
		if (lastVerseIndex < verses.length - 1) {
			for (var k = verses.length - 1; k > lastVerseIndex; k--) {
				var found = false;
				var count = 0; // The parent to delete should not be more than 6 level up.
				var parent = $(verses[k]).parent();
				while ((!found) && (count < 6)) {
					if ((parent.hasClass("verse")) || (parent.hasClass("row")) || (parent.hasClass("verseGrouping")) || (parent.hasClass("interlinear"))) {
						parent.remove();
						found = true;
						versesRemoved ++;
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
					if ((parent.hasClass("verse")) || (parent.hasClass("row")) || (parent.hasClass("verseGrouping"))|| (parent.hasClass("interlinear"))) {
						parent.remove();
						found = true;
						versesRemoved ++;
					}
					else parent = parent.parent();
					count ++;
				}
			}
		}
		var endNotes = "";
		
		if ($("#selectnotes").prop("checked")) {
			var notes = $(copyOfPassage).find('.note');
			for (var l = 0; l < notes.length; l++) {
				var aTag = $(notes[l]).find("a");
				if (aTag.length > 1) {
					noteID = "n" + (l + 1); // The notes number will start with 1, not zero.
					refs = $(notes[l]).find(".inlineNote").text().replace(/▼/, "");
					$("<span>(" + noteID + ") </span>").insertAfter(notes[l]);
					endNotes += "\n(" + noteID + ") " + refs;
				}
			}
		}
		var endXrefs = "";
		if ($("#selectxref").prop("checked")) {
			var notes = $(copyOfPassage).find('.note');
			for (var l = 0; l < notes.length; l++) {
				var aTag = $(notes[l]).find("a");
				if (aTag.length == 1) {
					var noteID = $(aTag).text();
					var refs = "";
					var margins = $(".margin");
					if (margins.length > 0) {
						for (var m = 0; m < margins.length; m++) {
							if (noteID === $(margins[m]).find("strong").text()) {
								var linkRefs = $(margins[m]).find(".linkRef");
								for (var n = 0; n < linkRefs.length; n ++) {
									if (n > 0) refs += ", ";
									refs += $(linkRefs[n]).text();
								}
								continue;
							}
						}
					}
				}
				if (refs !== "") {
					$("<span>(" + noteID + ") </span>").insertAfter(notes[l]);
					endXrefs += "\n(" + noteID + ") " + refs;
				}
			}
		}

		$(copyOfPassage).find('.notesPane').remove()
		$(copyOfPassage).find('.note').remove();
		if ($(copyOfPassage).find('.verseGrouping').length == 0)
			$(copyOfPassage).find('.heading').remove();
		else {
			$(copyOfPassage).find('.heading').prepend("\n");
			var singleVerses = $(copyOfPassage).find('.singleVerse');
			for (var i = 0; i < singleVerses.length; i ++) {
				$(singleVerses[i]).html( $(singleVerses[i]).html().replace(/(>\(\w{2,8}\))\n/, "$1") );
			}
			$(singleVerses).prepend("\n");
		}
		$(copyOfPassage).find(".stepButton").remove();
		$(copyOfPassage).find(".level2").text("\t");
		$(copyOfPassage).find(".level3").text("\t\t");
		$(copyOfPassage).find(".level4").text("\t\t\t");
		$(copyOfPassage).find(".level5").text("\t\t\t\t");
		$(copyOfPassage).find('.startLineGroup').replaceWith("\n");
		$(copyOfPassage).find("h2.xgen").prepend("\n");
		if ($(copyOfPassage).find('.headingVerseNumber').length > 0)
			$(copyOfPassage).find('.headingVerseNumber').prepend("\n");
		var interlinearClasses = $(copyOfPassage).find('.interlinear');
		for (var j = 0; j < interlinearClasses.length; j++) {
			if ($($(interlinearClasses[j]).find(".interlinear")).length == 0) {
				var text = $(interlinearClasses[j]).text();
				if (text.indexOf("[") > -1) continue;
				text = text.replace(/\s/g, "").replace(/&nbsp;/g, "");
				if (text.length == 0) continue;
				$(interlinearClasses[j]).prepend(" [").append("] ");
			}
			else $(interlinearClasses[j]).prepend("<br>");
		}
		$(copyOfPassage).find(".verseNumber").append(" ");
		$(copyOfPassage).find(".interVerseNumbers").prepend("<br>");
		$(copyOfPassage).find("p").replaceWith("\n");
		$(copyOfPassage).find("br").replaceWith("\n");

		var versionsString = step.util.activePassage().get("masterVersion");
		var extraVersions = step.util.activePassage().get("extraVersions");
		if (extraVersions !== "") versionsString += "," + extraVersions;
		var versions = versionsString.split(",");
		var comparingTable = $(copyOfPassage).find('.comparingTable');
		if (comparingTable.length > 0) {
			var rows = $(comparingTable).find("tr.row");
			if (rows.length > 0) {
				for (var k = 0; k < rows.length; k++) {
					var cells = $(rows[k]).find("td.cell");
					if (cells.length == versions.length) {
						for (var l = 0; l < cells.length; l++) {
							$(cells[l]).prepend("\n(" + versions[l] + ") ");
						}
					}
				}
			}
			$(comparingTable).find("tr").not(".row").remove();
		}
		var textToCopy = ""
		for (var m = 0; m < copyOfPassage.length; m++) {
//			$(copyOfPassage[m]).html().replace(/<br\s*[\/]?>/gi, "\n");
			var posSearch = $(copyOfPassage[m]).html().search(/<br\s*[\/]?>/);
			if (posSearch> -1) {
				console.log("pos: " + posSearch + " " + $(copyOfPassage[m]).html());
			}
			textToCopy += $(copyOfPassage[m]).text().replace(/    /g, " ")
			.replace(/   /g, " ").replace(/  /g, " ").replace(/\t /g, "\t")
			.replace(/\n\s+\n/g, "\n\n").replace(/\n\n\n/g, "\n\n").replace(/\n\n\t/g, "\n\t").replace(/^\n/g, "")
			.replace(/(\n) (\d)/g, "$1$2").replace(/\n $/, "\n").replace(/\n\n$/, "\n");
			if (textToCopy.search(/\n$/) == -1)
				textToCopy += "\n";
		}
		
		if ($(copyOfPassage).find('.verseGrouping').length > 0) {
			textToCopy = textToCopy.replace(/\n\n/g, "\n");
		}
		if (interlinearClasses.length > 0) {
			var updatedText = "";
			var textByLines = textToCopy.split(/\n/);
			for (var n = 0; n < textByLines.length; n ++) {
				var tmp = textByLines[n].replace(/\s+/g, " ");
				if ((tmp === "") || (tmp === " "))
					continue;
				updatedText += tmp + "\n";
			}
			textToCopy = updatedText;
		}
		if (endNotes !== "") textToCopy += "\nNotes:" + endNotes;
		if (endXrefs !== "") textToCopy += "\nCross references:" + endXrefs;
		for (var i = 0; i < versions.length; i++) {
			currentVersion = versions[i];
			if (currentVersion === "") continue;
			$.ajaxSetup({async: false});
			$.getJSON("/html/copyrights/" + currentVersion + ".json", function(copyRights) {
				textToCopy += "\n" + currentVersion + ": " + copyRights;
			}).fail(function() {
                textToCopy += "\n" + currentVersion + ": Copyright notice at STEPBible.org/version.jsp?version=" + currentVersion;
            });
			;
			$.ajaxSetup({async: true});
		}
		var previousCopyTimeStamps = $.cookie("step.copyTimeStamps");
		var currentTimeInSeconds =  Math.floor( new Date().getTime() / 1000 );
		var timeStampForNewCookie = currentTimeInSeconds.toString();
		if (versesRemoved > 0) {
			var gracePeriod = Math.floor(20 * (versesRemoved / verses.length));
			console.log("grace period: " + gracePeriod);
			timeStampForNewCookie -= gracePeriod;
		}
		var copiesInLastMinute = 0;
		var longestDifference = 0;
		var previousTimes = [];
		if ((previousCopyTimeStamps != null) && (typeof previousCopyTimeStamps === "string")) {
			previousTimes = previousCopyTimeStamps.split(",");
			for (var j = 0; j < previousTimes.length; j ++) {
				if (previousTimes[j] === "") continue;
				var difference = currentTimeInSeconds - previousTimes[j];
				if (difference > 60) continue;
				if (longestDifference < difference) longestDifference = difference;
				timeStampForNewCookie += "," + previousTimes[j];
				copiesInLastMinute ++;
			}
		}
		var sleepTime = 1000;
		$.cookie("step.copyTimeStamps", timeStampForNewCookie);
		if (copiesInLastMinute > 4) {
			alert("You are copying at a rapid pace.\n\nThe copy function is intended for personal use within the copyrights limitation.  Please review the copyrights requirement for the Bibles (" +
				versionsString +
				") you are using.");
			sleepTime = Math.min((60 - longestDifference) * 1000, 5000);
			$("#copyModal").find('.close').hide();
		}
		else if (previousTimes.length > 0) sleepTime = 600;
		navigator.clipboard.writeText(textToCopy);
		$('#bookchaptermodalbody').empty();
		$('#bookchaptermodalbody').append("<h2>The text is copied, ready to be pasted.");
		$('#copyModalFooter').empty();
		setTimeout( function() { step.util.closeModal("copyModal")}, sleepTime);
	},

	_buildChptrVrsTbl: function(firstSelection) {
		var passageContainer = step.util.getPassageContainer(step.util.activePassageId());
		var versesInPanel = $(passageContainer).find(".versenumber");
		var verses = [];
		if (versesInPanel.length > 0) {
			for (var i = 0; i < versesInPanel.length; i ++) {
				verses.push($(versesInPanel[i]).text());
			}
		}
		else {
			versesInPanel = $(passageContainer).find(".verseLink");
			for (var i = 0; i < versesInPanel.length; i ++) {
				var tmp = $(versesInPanel[i]).attr("name");
				tmp = tmp.replace(/^([123A-Za-z]+)\.(\d)/, "$1 $2").replace(/\./g, ":");
				verses.push(tmp);
			}
		}

		var hasXRefs = false;
		var hasNotes = false;
		var notes = $(passageContainer).find('.note');
		for (var l = 0; ((l < notes.length) && (!hasXRefs || (!hasNotes))); l++) {
			var aTag = $(notes[l]).find("a");
			if ((aTag.length == 1) && (!hasXRefs)) {
				$("#includeXRefs").show();
				hasXRefs = true;
			}
			else if ((aTag.length > 1) && (!hasNotes)) {
				$("#includeNotes").show();
				hasNotes = true;
			}
		}

		var headerMsg = (firstSelection == -1) ? "Select the <i>first</i> verse to copy<br><br><br>" : 
			"Copy will start from verse: " + verses[firstSelection] + "<br>Select the <i>last</i> verse to copy.  If you only want to copy one verse, select the same verse again.";
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
			var verseName = verses[i];
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