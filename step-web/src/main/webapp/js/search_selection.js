var version = "ESV_th";
var userLang = "en";
var searchOnSpecificType = "";
var searchTypeCode = [TEXT_SEARCH, SUBJECT_SEARCH, MEANINGS, GREEK_MEANINGS, GREEK, HEBREW_MEANINGS, HEBREW];
var searchModalCurrentPage = 1;
var searchUserInput = "";
var searchRange = "Gen-Rev";
var previousSearchTokens = [];
var numOfPreviousSearchTokens = 0;
var includePreviousSearches = false;
var rangeWasUpdated = false;
var andOrNotUpdated = false;
var timer;
var osisChapterJsword = [ // Array of OSIS id, number of chapters in the book and the JSword name (if it is different from OSIS id
        ["Gen", 50],
        ["Exo", 40, "Exod"],
        ["Lev", 27],
        ["Num", 36],
        ["Deu", 34, "Deut"],
        ["Jos", 24, "Josh"],
        ["Judg", 21],
        ["Rut", 4, "Ruth"],
        ["1Sa", 31, "1Sam"],
        ["2Sa", 24, "2Sam"],
        ["1Ki", 22, "1Kgs"],
        ["2Ki", 25, "2Kgs"],
        ["1Ch", 29, "1Chr"],
        ["2Ch", 36, "2Chr"],
        ["Ezr", 10, "Ezra"],
        ["Neh", 13],
        ["Est", 10, "Esth"],
        ["Job", 42],
        ["Psa", 150, "Ps"],
        ["Pro", 31, "Prov"],
        ["Ecc", 12, "Eccl"],
        ["Song", 8],
        ["Isa", 66],
        ["Jer", 52],
        ["Lam", 5],
        ["Eze", 48, "Ezek"],
        ["Dan", 12],
        ["Hos", 14],
        ["Joe", 3, "Joel"],
        ["Amo", 9, "Amos"],
        ["Obd", 1, "Obad"],
        ["Jon", 4, "Jonah"],
        ["Mic", 7],
        ["Nah", 3],
        ["Hab", 3],
        ["Zep", 3, "Zeph"],
        ["Hag", 2],
        ["Zec", 14, "Zech"],
        ["Mal", 4],
        ["Mat", 28, "Matt"],
        ["Mar", 16, "Mark"],
        ["Luk", 24, "Luke"],
        ["Joh", 21, "John"],
        ["Act", 28, "Acts"],
        ["Rom", 16],
        ["1Cor", 16],
        ["2Cor", 13],
        ["Gal", 6],
        ["Eph", 6],
        ["Phili", 4, "Phil"],
        ["Col", 4],
        ["1Th", 5, "1Thess"],
        ["2Th", 3, "2Thess"],
        ["1Ti", 6, "1Tim"],
        ["2Ti", 4, "2Tim"],
        ["Tit", 3, "Titus"],
        ["Phile", 1, "Phlm"],
        ["Heb", 13],
        ["Jam", 5, "Jas"],
        ["1Pe", 5, "1Pet"],
        ["2Pe", 3, "2Pet"],
        ["1Jo", 5, "1John"],
        ["2Jo", 1, "2John"],
        ["3Jo", 1, "3John"],
        ["Jude", 1],
        ["Rev", 22]
    ];
var idx2osisChapterJsword = {
    "Gen": 0,
    "Exo": 1, "Exod": 1,
    "Lev": 2,
    "Num": 3,
    "Deu": 4, "Deut": 4,
    "Jos": 5, "Josh": 5,
    "Judg": 6,
    "Rut": 7, "Ruth": 7,
    "1Sa": 8, "1Sam": 8,
    "2Sa": 9, "2Sam": 9,
    "1Ki": 10, "1Kgs": 10,
    "2Ki": 11, "2Kgs": 11,
    "1Ch": 12, "1Chr": 12,
    "2Ch": 13, "2Chr": 13,
    "Ezr": 14, "Ezra": 14,
    "Neh": 15,
    "Est": 16, "Esth": 16,
    "Job": 17,
    "Psa": 18, "Ps": 18,
    "Pro": 19, "Prov": 19,
    "Ecc": 20, "Eccl": 20,
    "Song": 21,
    "Isa": 22,
    "Jer": 23,
    "Lam": 24,
    "Eze": 25, "Ezek": 25,
    "Dan": 26,
    "Hos": 27,
    "Joe": 28, "Joel": 28,
    "Amo": 29, "Amos": 29,
    "Obd": 30, "Obad": 30,
    "Jon": 31, "Jonah": 31,
    "Mic": 32,
    "Nah": 33,
    "Hab": 34,
    "Zep": 35, "Zeph": 35,
    "Hag": 36,
    "Zec": 37, "Zech": 37,
    "Mal": 38,
    "Mat": 39, "Matt": 39,
    "Mar": 40, "Mark": 40,
    "Luk": 41, "Luke": 41,
    "Joh": 42, "John": 42,
    "Act": 43, "Acts": 43,
    "Rom": 44,
    "1Cor": 45,
    "2Cor": 46,
    "Gal": 47,
    "Eph": 48,
    "Phili": 49, "Phil": 49,
    "Col": 50,
    "1Th": 51, "1Thess": 51,
    "2Th": 52, "2Thess": 52,
    "1Ti": 53, "1Tim": 53,
    "2Ti": 54, "2Tim": 54,
    "Tit": 55, "Titus": 55,
    "Phile": 56, "Phlm": 56,
    "Heb": 57,
    "Jam": 58, "Jas": 58,
    "1Pe": 59, "1Pet": 59,
    "2Pe": 60, "2Pet": 60,
    "1Jo": 61, "1John": 61,
    "2Jo": 62, "2John": 62,
    "3Jo": 63, "3John": 63,
    "Jude": 64,
    "Rev": 65
}
var groupsOT = [
    {groupName: __s.book_of_moses, show: false, books: [0, 1, 2, 3, 4], bookOrderPos: [-1, -1, -1, -1, -1]},
    {groupName: __s.history_books, show: false, books: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
        bookOrderPos: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]},
    {groupName: __s.poetic_books, show: false, books: [17, 18, 19, 20, 21], bookOrderPos: [-1, -1, -1, -1, -1]},
    {groupName: __s.major_prophets, show: false, books: [22, 23, 24, 25, 26], bookOrderPos: [-1, -1, -1, -1, -1]},
    {groupName: __s.minor_prophets, show: false, books: [27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38],
        bookOrderPos: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]}
];
var groupsNT = [
    {groupName: __s.gospels_and_acts, show: false, books: [39, 40, 41, 42, 43], bookOrderPos: [-1, -1, -1, -1, -1]},
    {groupName: __s.pauline_epistles, show: false, books: [44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56],
        bookOrderPos: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]},
    {groupName: __s.other_nt, show: false, books: [57, 58, 59, 60, 61, 62, 63, 64, 65],
        bookOrderPos: [-1, -1, -1, -1, -1, -1, -1, -1, -1]}
];
var groupsOther;
var bookOrder = [];
var idx2BookOrder = {};
var showUpdtPrvsSrchBtn = false;

function initSearchSelection() {
    userLang = step.state.language() || "en-US";
    $('#display_result_in').text(__s.display_result_in);
    $('#current_panel').text(__s.current_panel);
    $('#new_panel').text(__s.new_panel);
    $('#updateButton').text(__s.update_search);
    var ua = navigator.userAgent.toLowerCase();
    $("#searchmodalbody").addClass("scrollPart");
    if ((userLang.indexOf('en') != 0) && (groupsOT[0].groupName === "Books of Moses") && (groupsOT[0].groupName !== "Pentateuch"))
        groupsOT[0].groupName = __s.the_pentateuch;
    if ($('.passageContainer.active').width() < 500) $('#displayLocForm').hide();
    if (step.util.getPassageContainer(step.util.activePassageId()).find(".resultsLabel").text() !== "") {
        var activePassageData = step.util.activePassage().get("searchTokens") || [];
        var existingReferences = "";
        $('#previousSearch').empty();
        var listOfPreviousSearch = [];
        previousSearchTokens = [];
        numOfPreviousSearchTokens = 0;
        for (var i = 0; i < activePassageData.length; i++) {
            var actPsgeDataElm = activePassageData[i];
            var itemType = actPsgeDataElm.itemType ? actPsgeDataElm.itemType : actPsgeDataElm.tokenType
            if (itemType == REFERENCE) {
                if (existingReferences !== "") existingReferences += ",";
                existingReferences += actPsgeDataElm.item.osisID.replace(/ /g, ',');
            }
            else if (itemType !== VERSION) {
                if (itemType === SYNTAX) {
                    var syntaxWords = actPsgeDataElm.token.replace(/\(/g, '').replace(/\)/g, '').split(" ");
                    step.util.findSearchTermsInQuotes(syntaxWords);
                    var searchRelationship = "";
                    for (var j = 0; j < syntaxWords.length; j++) {
                        if (syntaxWords[j] == "") continue;
                        if ((j > 0) && (searchRelationship === "") &&
                            ((syntaxWords[j] === "AND") || (syntaxWords[j] === "OR") || (syntaxWords[j] === "NOT"))) {
                            searchRelationship = syntaxWords[j];
                            continue;
                        }
                        if (syntaxWords[j].substr(0, 7) === STRONG_NUMBER + ":") {
                            var strongNum = syntaxWords[j].substr(7);
                            if (strongNum.substr(0, 1).toUpperCase() === "G") itemType = GREEK;
                            else if (strongNum.substr(0, 1).toUpperCase() === "H") itemType = HEBREW;
                            var result = step.util.getDetailsOfStrong(strongNum, version);
                            currWord = {token: syntaxWords[j], item: {gloss: result[0], stepTransliteration: result[1], matchingForm: result[2]} };
                        }
                        else {
                            itemType = TEXT_SEARCH;
                            currWord = {token: syntaxWords[j], item: {} };
                        }
                        numOfPreviousSearchTokens = createPreviousSearchList(itemType, currWord, listOfPreviousSearch, previousSearchTokens, numOfPreviousSearchTokens, searchRelationship);
                        searchRelationship = "";
                    }
                }
                else numOfPreviousSearchTokens = createPreviousSearchList(itemType, actPsgeDataElm, listOfPreviousSearch, previousSearchTokens, numOfPreviousSearchTokens);
            }
        }
        if (listOfPreviousSearch.length > 0) {
            var previousSearchHTML =
            '<div id="modalonoffswitch">' +
                '<span  class="pull-left" style="font-size:18px" id="search_with_previous"><b>Verses from previous searches ...</b>&nbsp;&nbsp;</span>' +
                '<span class="pull-left">' +
                    '<select id="searchAndOrNot" style="display:none;font-size:16px" class="stepButton" type="text" onchange="javascript:handlePreviousSearchAndOrNot()">' +
                        '<option id="and_search" value="AND">that also include the above [AND]</option>' +
                        '<option id="or_search" value="OR">plus those including the above [OR]</option>' +
                        '<option id="not_search" value="NOT">that don\'t include the above [NOT]</option>' +
                    '</select>' +
                '</span>' +
                '<span class="onoffswitch2 pull-left">' +
                    '<input type="checkbox" name="onoffswitch2" class="onoffswitch2-checkbox" id="showprevioussearchonoff" onchange="showPreviousSearch()"/>' +
                    '<label class="onoffswitch2-label" for="showprevioussearchonoff">' +
                    '<span class="onoffswitch2-inner"></span>' +
                    '<span class="onoffswitch2-switch"></span>' +
                    '</label>' +
                '</span>' +
            '</div>' +
            '<br><br><br><br>' +
            '<ul id="listofprevioussearchs" style="display:none">';
            for (var j = 0; j < listOfPreviousSearch.length; j++) {
                previousSearchHTML += "<li id='lOPS_" + j + "'>" + listOfPreviousSearch[j] + 
                "<span class='closeMark' onclick=removePreviousSearch(" + j + ")>X</span></li>";
            }
            previousSearchHTML += "</ul>";
            $('#previousSearch').append(previousSearchHTML);
        }
        if (existingReferences !== "") searchRange = existingReferences;
    }
    else {
        $('#modalonoffswitch').hide();
        $('#searchAndOrNot').hide();
    }
    $('#searchHdrTable').append(_buildSearchHeaderAndTable());
    $('#srchModalBackButton').hide();
    $(function(){
        $('textarea#userTextInput').keyup(function(e){
            timer && clearTimeout(timer);
            timer = setTimeout(handleKeyboardInput, 300, e);
        });
    });
    $('textarea#userTextInput').focus();
}

function createPreviousSearchList(itemType, actPsgeDataElm, listOfPreviousSearch, previousSearchTokens, numOfPreviousSearchTokens, previousSearchRelationship) {
    if (typeof previousSearchRelationship === "undefined") previousSearchRelationship = "";
    else if (previousSearchRelationship !== "") {
        var andSelected = (previousSearchRelationship === "AND") ? " selected" : "";
        var orSelected = (previousSearchRelationship === "OR") ? " selected" : "";
        var notSelected = (previousSearchRelationship === "NOT") ? " selected" : "";
        previousSearchRelationship = 
            ' <select id="searchAndOrNot' + numOfPreviousSearchTokens + '" class="stepButton" style="font-size:16px" type="text" onchange="javascript:handleAndOrNot()">' +
                '<option id="and_search" value="AND"' + andSelected + '>AND</option>' +
                '<option id="or_search" value="OR"' + orSelected + '>OR</option>' +
                '<option id="not_search" value="NOT"' + notSelected + '>NOT</option>' +
            '</select> ';
    }
    if (searchTypeCode.indexOf(itemType) > 2) {
        var type = itemType;
        if (type.toLowerCase().startsWith("greek")) type = "Greek";
        else if (type.toLowerCase().startsWith("hebrew")) type = "Hebrew";
        var htmlOfTerm = actPsgeDataElm.item.gloss;
        if (actPsgeDataElm.item.stepTransliteration !== "")
            htmlOfTerm += ' (<i>' + actPsgeDataElm.item.stepTransliteration + '</i> - ' + actPsgeDataElm.item.matchingForm + ')';
        html = "<span style='font-size:16px'>" + previousSearchRelationship + type + "</span> = " + htmlOfTerm;
        listOfPreviousSearch.push(html);
        var strongNum = actPsgeDataElm.token.toLowerCase().startsWith("strong:") ? actPsgeDataElm.token.substr(7) : actPsgeDataElm.token;
        if (strongNum.search(/([GH]\d{4,5})[abcdefg]$/) > -1) strongNum = RegExp.$1; // remove the last character if it is an a-g character
        previousSearchTokens.push("strong=" + strongNum);
        if (actPsgeDataElm.item.stepTransliteration !== "") step.util.putStrongDetails(strongNum, htmlOfTerm);
    }
    else {
        var type = itemType;
        if (type.toLowerCase() === "text") type = "Word or phrase";
        listOfPreviousSearch.push("<span style='font-size:16px'>" + previousSearchRelationship + type + "</span> = " + actPsgeDataElm.token);
        previousSearchTokens.push(itemType + "=" + actPsgeDataElm.token);
    }
    return numOfPreviousSearchTokens + 1;
}

function handleKeyboardInput(e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13) {
        $('#warningMessage').text(__s.click_to_select_search);
        var userInput =  $('textarea#userTextInput').val();
        userInput = userInput.replace(/[\n\r]/g, '').replace(/\t/g, ' ').replace(/\s\s/g, ' ').replace(/,,/g, ',').replace(/^\s+/g, '');
        $('textarea#userTextInput').val(userInput);
        if (userInput.replace(/\s\s+/, ' ').search(/^\s?[\da-z][a-z]+[\s.]?\d/i) > -1) _handleEnteredSearchWord(null, null, true);
    }
    else {
        $('#warningMessage').text("");
        _handleEnteredSearchWord();
    }
}

function goBackToPreviousPage() {
    $('#searchSelectError').text("");
    $('#srchModalBackButton').prop('title', '');
    $("#updateRangeButton").hide();
    showPreviousSearch(); // The function will determine if it need to show previous search
    if (typeof $('textarea#userTextInput').val() == "undefined") { // Must be in the search range because search range does not have ID userTextInput
        $('#searchHdrTable').empty().append(_buildSearchHeaderAndTable());
        $('#previousSearch').show();
        if (searchModalCurrentPage === 1) $('#srchModalBackButton').hide();
        $(function(){
            $('textarea#userTextInput').keyup(function(e){
                timer && clearTimeout(timer);
                timer = setTimeout(handleKeyboardInput, 300, e);
            });
        });
        $('textarea#userTextInput').focus();
        _handleEnteredSearchWord(null, searchUserInput);
    }
    else if (searchModalCurrentPage === 2) {
        searchOnSpecificType = "";
        searchModalCurrentPage = 1;
        $('#srchModalBackButton').hide();
        _handleEnteredSearchWord();
    }
    else alert('Unknown state goBackToPreviousPage');
}

function _buildSearchHeaderAndTable() {
    var html = '<div class="header">' +
        '<h4>' + __s.enter_search_word + '</h4>' +
        '<button id="searchRangeButton" type="button" class="stepButtonTriangle" style="float:right;" onclick=_buildRangeHeaderAndTable()><b>' + __s.search_range + ':</b> ' + searchRange + '</button>' +
        '</div><br>' +
        '<span id="warningMessage" style="color: red;"></span>' +
        '<textarea id="userTextInput" rows="1" style="font-size:16px; width: 80%;"></textarea><br><br>' + // size 16px so the mobile devices will not expand
        '<div id="search_table">' +
        '<table border="1">' +
        '<colgroup>' +
        '<col span="1" style="width:39%;">' +
        '<col span="1" style="width:61%;">' +
        '</colgroup>' +
        '<tr>' +
        '<th scope="col">' + __s.type_of_search + '</th>' +
        '<th scope="col">' + __s.suggested_search_words + '</th>' +
        '</tr>';
    for (var i = 0; i < searchTypeCode.length; i ++) {
        var srchCode = searchTypeCode[i];
        var warnMsgForOrNotSearch = ((srchCode === MEANINGS) || (srchCode === SUBJECT_SEARCH)) ?
            '<span id="searchResults' + srchCode + 'Warn" style="display:none">Not available with "OR" or "NOT" search.</span>' :
            "";
        html += '<tr style="height:40px;" class="select2-results-dept-0 select2-result select2-result-selectable select-' + srchCode + '">' +
            '<td class="select2-results-dept-0 select2-result select2-result-selectable select-' + srchCode + '" title="' + 
            __s['search_type_title_' + srchCode] + '" style="font-size:12px;text-align:left">' + __s['search_type_desc_' + srchCode] + ':</td>' +
            '<td style="text-align:left"><span id="searchResults' + srchCode + '"></span>' + warnMsgForOrNotSearch + '</td>' +
            '</tr>';
    }
    html += '</table>' +
        '</div>';
    return html;
}

function _buildRangeHeaderAndTable() {
    $('#searchSelectError').text("");
    $('#updateFeedback').text("");
    var html = _buildRangeHeaderAndSkeleton();
    $('#previousSearch').hide();
    $('#searchHdrTable').empty().append(html);
    $('#srchModalBackButton').show();
    $('#srchModalBackButton').prop('title', 'Return to search without updating search range.');
    _buildBookTable();
    if (searchRange !== 'Gen-Rev') {
        var tmpSearchRange = searchRange + ',';
        var posOfComma = tmpSearchRange.indexOf(',');
        var curRange = tmpSearchRange.substring(0, posOfComma);
        tmpSearchRange = tmpSearchRange.substring(posOfComma + 1);
        while (curRange !== '') {
            var posOfDash = curRange.indexOf('-');
            if (posOfDash == -1) {
                var posOfBook = idx2BookOrder[curRange];
                if (typeof posOfBook !== "undefined") bookOrder[posOfBook][1] = true;
            }
            else if (posOfDash > 1) {
                var firstBook = curRange.substring(0, posOfDash);
                var secondBook = curRange.substring(posOfDash + 1);
                var posOfBook1 = idx2BookOrder[firstBook];
                var posOfBook2 = idx2BookOrder[secondBook];
                if (typeof posOfBook1 !== "undefined") bookOrder[posOfBook1][1] = true;
                if (typeof posOfBook2 !== "undefined") {
                    bookOrder[posOfBook2][1] = true;
                    if ((posOfBook1 > -1) && (posOfBook1 < posOfBook2)) {
                        for (var i = posOfBook1 + 1; i < posOfBook2; i ++) bookOrder[i][1] = true; 
                    }
                }
            }
            var posOfComma = tmpSearchRange.indexOf(',');
            if (posOfComma === -1) {
                curRange = '';
                tmpSearchRange = '';
            }
            else {
                curRange = tmpSearchRange.substring(0, posOfComma);
                tmpSearchRange = tmpSearchRange.substring(posOfComma + 1);
            }
        }
    }
    for (var i = 0; i < 3; i++) {
        var curGroup;
        var idPrefix;
        if (i == 0) {
           curGroup = groupsOT;
           idPrefix = 'ot_tableg';
        }
        else if (i == 1) {
           curGroup = groupsNT;
           idPrefix = 'nt_tableg';
        }
        else if (i == 2) {
           curGroup = groupsOther;
           idPrefix = 'ob_tableg';
        }
        for (var j = 0; j < curGroup.length; j++) {
            for (var k = 0; k < curGroup[j].bookOrderPos.length; k++) {
                if (!(bookOrder[curGroup[j].bookOrderPos[k]][1])) {
                   _userClickedBook(idPrefix + j + 'b' + k);
                }
            }
        }
    }
    if (searchRange === 'Gen-Rev') $('#updateFeedback').text(__s.all_books_not_selected);
    else $('#updateFeedback').text(__s.search_range_button_color_desc);
    $('#searchSelectError').text("");
    $('#updateRangeButton').hide();
    $('#updateRangeButton').text(__s.update_search_range);
    $('#updateButton').hide();
}

function _buildRangeHeaderAndSkeleton() {
    var fontSize = 16;
    //var userAgentString = navigator.userAgent;
    //if (((userAgentString.indexOf("iPad") > -1) || (userAgentString.indexOf("iPhone") > -1)) && (userAgentString.indexOf("Safari/600.1.4") > -1)) {
    //	fontSize = 12;
    //}
    var html = '<div class="header">' +
        '<h4>' + __s.click_to_select_search_range + ':</h4>' +
        '<span style="float:right">' + __s.search_range_button_color_desc + '</span>' +
        '</div>' +
        '<span id="updateFeedback"></span>' +
        '<div id="search_range_table">' +
        '<button id="ot_hdr" type="button" class="stepButton stepPressedButton" style="display:block;width:97%;font-size:' + fontSize + 'px" ' +
        'title="'  + __s.click_to_select + ' ' + __s.all + ' '  + __s.old_testament + ' ' + __s.bible_book + '" ' +
        'onclick=_userClickedTestament(this.id)><i>' + __s.old_testament + ':</i></button>' +
        '<div id="ot_table"/>' +
        '<button id="nt_hdr" type="button" class="stepButton stepPressedButton" style="display:block;width:97%;font-size:' + fontSize + 'px" ' +
        'title="'  + __s.click_to_select + ' ' + __s.all + ' '  + __s.new_testament + ' ' + __s.bible_book + '" ' +
        'onclick=_userClickedTestament(this.id)><i>' + __s.new_testament + ':</i></button>' +
        '<div id="nt_table"/>' +
        '<h4 id="other_books_hdr"/>' +
        '<div id="ob_table"/>';
    return html;
}

function _updateRange() {
    $('#searchSelectError').text("");
    var curIndx = -1;
    for (var i = 0; i < 3; i++) {
        var curGroup;
        var idPrefix;
        if (i == 0) {
            curGroup = groupsOT;
            idPrefix = '#ot_tableg';
        }
        else if (i == 1) {
            curGroup = groupsNT;
            idPrefix = '#nt_tableg';
        }
        else if (i == 2) {
            curGroup = groupsOther;
            idPrefix = '#ob_tableg';
        }
        for (var j = 0; j < curGroup.length; j++) {
            for (var k = 0; k < curGroup[j].bookOrderPos.length; k++) {
                curIndx ++;
                if ( ($(idPrefix + j + 'b' + k).hasClass('stepPressedButton')) &&
                     (curGroup[j].bookOrderPos[k] > -1) )
                    bookOrder[curGroup[j].bookOrderPos[k]][1] = true;
                else bookOrder[curGroup[j].bookOrderPos[k]][1] = false;
            }
        }
    }
    var start = -1;
    var end = -1;
    var result = "";
    for (var i = 0; i < bookOrder.length; i++) {
        if (bookOrder[i][1]) {
            if (start === -1) start = i;
            end = i;
        }
        else {
            result += _createSingleRange(start, end);
            start = -1;
            end = -1;
        }
    }
    result += _createSingleRange(start, end);
    if (result.length > 0) searchRange = result.replace(/,$/, '');
    else searchRange = "Gen-Rev";
    rangeWasUpdated = true;
    goBackToPreviousPage();
}

function _createSingleRange(start, end) {
    var result = '';
    if (start !== -1) {
        var result = bookOrder[start][0];
        if (start !== end) {
            result += '-';
            result += bookOrder[end][0];
        }
        result += ',';
    }
    return result;
}

function _buildBookTable() {
    var translationType = _getTranslationType();
    if ((userLang.toLowerCase().startsWith("en") || userLang.toLowerCase().startsWith("es") || userLang.toLowerCase().startsWith("zh")) &&
        (translationType !== "")) {
        _buildBookHTMLTable(translationType);
    }
    else {
        var url = SEARCH_AUTO_SUGGESTIONS + "%20%20/" + EXAMPLE_DATA + "%3D" + REFERENCE + "%7C" + LIMIT + "%3D" + REFERENCE + "%7C" + VERSION + "%3D" + version + "%7C?lang=" + userLang;
        $.ajaxSetup({async: false});
        $.getJSON(url, function (data) {
            _buildBookHTMLTable(data);
        });
        $.ajaxSetup({async: true});
    }	
}

function _getTranslationType() {
    var versionAltName = '';
    var data = step.util.activePassage().get("searchTokens") || [];
    for (var i = 0; i < data.length; i++) {
        if (data[i].itemType == VERSION) {
            version = data[i].item.initials;
            versionAltName = data[i].item.shortInitials;
            break;
        }
    }
    var translationsWithPopularBooksChapters = " niv esv nasb nasb_th nav sparv sparv1909 cun cuns chincvs abp abpgrk acv akjv alb arasvd asmulb asv bbe benulb bsb bulprotrev burjudson ccb clarke cro cym czebkr dan dan1871 darby dtn dutkant dutsvv esperanto fcb finbiblia finpr frebbb frecrl fremartin frepgr gen gerelb1871 gerelb1905 gergruenewald gersch gujulb haitian hcsb hinulb hnv hrvcb hunkar icelandic itadio itarive jfb jub kanulb kjv korhkjv korrv lbla luther mal1865 malulb maori marulb mhc mhcc nbla ndebele neno netfull nhe nhj nhm norsk norsmb ntlr nvi oriulb panulb pnvi polgdanska porar romcor roth rskj rwebs scofield serdke shona sparvg spasev swe1917 swekarlxii1873 tagangbiblia tamulb telulb tglulb tsk ukjv ukrainian umgreek urdulb viet vulgj web webb webm webs ylt ";
    var translationsWithPopularNTBooksChapters = ' 20c abbott ant armwestern barnes bashautin burkitt bwe byz cebulb che1860 comm copsahhorner copsahidica copsahidicmss diag ee elz eth family godb hauulb indulb khmkcb latvian leb lo mont murd nepulb nestle pesh pltulb pnt portb rkjn rwp sblg sblgntapp spavnt swahili swaulb thgnt tisch tnt tr ukrkulish uma varapp weym whnu wors ';
    var translationsWithPopularOTBooksChapters = ' ab gertextbibel kd wlc lees lxx rusmakarij ';
    var lowerCaseVersion = ' ' + version.toLowerCase() + ' ';
    versionAltName = ' ' + versionAltName.toLowerCase() + ' ';
    var translationType = "";
    if ((translationsWithPopularBooksChapters.indexOf(lowerCaseVersion) > -1) || (translationsWithPopularBooksChapters.indexOf(versionAltName) > -1)) translationType = "OTNT";
    else if ((translationsWithPopularNTBooksChapters.indexOf(lowerCaseVersion) > -1) || (translationsWithPopularNTBooksChapters.indexOf(versionAltName) > -1)) translationType = "NT";
    else if ((translationsWithPopularOTBooksChapters.indexOf(lowerCaseVersion) > -1) || (translationsWithPopularOTBooksChapters.indexOf(versionAltName) > -1)) translationType = "OT";
    return translationType;		
}

function _buildBookHTMLTable(data) {
    var counter = 0;
    var notSeenNT = true;
    var typlicalBooksChapters = false;
    var arrayOfTyplicalBooksChapters;
    var start = 0;
    var end = 0;
    if (typeof data === "string") {
        if (data == "OTNT") end = 66;
        else if (data == "OT") end = 39;
        else if (data == "NT") {
            start = 39;
            end = 66;
        }
        data = osisChapterJsword;
        typlicalBooksChapters = true;
        arrayOfTyplicalBooksChapters = JSON.parse(__s.list_of_bibles_books);
    }
    else end = data.length;
    var additionalBooks = false;
    groupsOther = [{groupName: 'Other', show: false, books: [], bookOrderPos: []}];
    bookOrder = [];
    idx2BookOrder = {};
    bookOrderPos = -1;
    for (var i = start; i < end; i++) {
        bookOrderPos ++;
        var currentOsisID;
        var shortNameToDisplay;
        var longNameToDisplay;
        if (typlicalBooksChapters) {
            currentOsisID = (data[i].length === 3) ? data[i][2] : data[i][0];
            longNameToDisplay = currentOsisID;
            shortNameToDisplay = currentOsisID;
        }
        else {
            currentOsisID = data[i].suggestion.osisID;
            longNameToDisplay = data[i].suggestion.fullName;
            shortNameToDisplay = (userLang.toLowerCase().startsWith("en")) ? currentOsisID : data[i].suggestion.shortName.replace(/ /g, "").substr(0, 6);
        }
        var longID = currentOsisID;
        var posOfBook = idx2osisChapterJsword[currentOsisID];
        if (posOfBook > -1) {
            if (typeof osisChapterJsword[posOfBook][2] !== "undefined") longID = osisChapterJsword[posOfBook][2];
            if (typeof arrayOfTyplicalBooksChapters !== "undefined") {
                longNameToDisplay = arrayOfTyplicalBooksChapters[posOfBook][0];
                shortNameToDisplay = (arrayOfTyplicalBooksChapters[posOfBook].length === 2) ? arrayOfTyplicalBooksChapters[posOfBook][1] : currentOsisID;
            }
        }
        bookOrder.push([currentOsisID, false, longID, shortNameToDisplay, longNameToDisplay]);
        idx2BookOrder[currentOsisID] = bookOrderPos;
        if (currentOsisID != longID) idx2BookOrder[longID] = bookOrderPos;
        
        var found = false;
        for (j = 0; j < groupsOT.length; j ++) {
            var pos = _isBookInGroup(groupsOT[j], currentOsisID);
            if (pos > -1) {
                groupsOT[j].show = true;
                groupsOT[j].bookOrderPos[pos] = bookOrderPos;
                found = true;
                break;
            }
        }
        if (!found) for (j = 0; j < groupsNT.length; j ++) {
            var pos = _isBookInGroup(groupsNT[j], currentOsisID);
            if (pos > -1) {
                groupsNT[j].show = true;
                groupsNT[j].bookOrderPos[pos] = bookOrderPos;
                found = true;
                break;
            }
        }
        if (!found) {
            groupsOther[0].show = true;
            groupsOther[0].books.push(-1);
            groupsOther[0].bookOrderPos.push(bookOrderPos);
        }
    }
    var browserWidth = $(window).width();
    var columns = 7;
    if (browserWidth < 1100) {
        columns = 6;
        if (browserWidth < 800) columns = 4;
    }
    _fillBooksTable(groupsOT, columns, 'ot_table');
    _fillBooksTable(groupsNT, columns, 'nt_table');
    _fillBooksTable(groupsOther, columns, 'ob_table');
}

function _isBookInGroup(groupOfBooks, searchForBookName) {
    for (var i = 0; i < groupOfBooks.books.length; i ++) {
        if ((searchForBookName == osisChapterJsword[groupOfBooks.books[i]][0]) ||
            (searchForBookName == osisChapterJsword[groupOfBooks.books[i]][2])) return i;
    }
    return -1;
}

function _getBookDisplayName(arrayIndex) {
    return [bookOrder[arrayIndex][4], bookOrder[arrayIndex][3]];
}

function _fillBooksTable(groupsOfBooks, columns, htmlID) {
    var tableHTML = "";
    var trHeight = 29;
    var fontSize = 12;
    for (j = 0; j < groupsOfBooks.length; j ++) {
        var rowsForThisGroup = Math.ceil(groupsOfBooks[j].bookOrderPos.length / (columns - 1));
        var rowHeight = trHeight * rowsForThisGroup;
        if (groupsOfBooks[j].show) {
            tableHTML += '<tr style="height:' + (trHeight + 1) + 'px"><td rowspan="' + rowsForThisGroup + '">' +
                '<button id="' + htmlID + 'g' + j + '"' +
                'type="button" class="stepButton stepPressedButton" style="font-size:' + fontSize + 'px;width:100%;min-height:' +  rowHeight + 'px" ' +
                'title="'  + __s.click_to_select + ' ' + __s.all + ' ' + groupsOfBooks[j].groupName  + ' ' + __s.bible_book + '" ' +
                'onclick=_userClickedCategory(this.id)>' +
                '<i>' + groupsOfBooks[j].groupName + ':</i></button>' +
                '</td>'; 
            var currentColumn = 2; // first column used by group name
            for (k = 0; k < groupsOfBooks[j].bookOrderPos.length; k++) {
                if (groupsOfBooks[j].bookOrderPos[k] > -1) {
                    if (currentColumn === 1) {
                        tableHTML += '<tr style="height:' + (trHeight + 1) + 'px">';
                        currentColumn = 2; // first column used by group name
                    }
                    var displayName = _getBookDisplayName(groupsOfBooks[j].bookOrderPos[k]);
                    tableHTML += '<td>' +
                        '<button id="' + htmlID + 'g' + j + 'b' + k + '" ' +
                        'title="'  + __s.click_to_select + ' ' + displayName[0] + '" ' +
                        // height used to be 95%
                        'type="button" class="stepButton stepPressedButton" style="font-size:' + fontSize + 'px;width:95%;height:' + (trHeight - 2) + 'px" ' + 'onclick=_userClickedBook(this.id)>' + 
                        displayName[1] +
                        '</button>' +
                        '</td>';
                    currentColumn++;
                    if (currentColumn > columns) {
                        currentColumn = 1;
                        tableHTML += '</tr>';
                    }
                }
            }
            tableHTML += '</tr>';
        }
    }
    if (tableHTML.length > 0) {
        if (htmlID === 'ob_table') $('#other_books_hdr').text('Other Books');
        $('#' + htmlID).append(_buildBookTableHeader(columns, htmlID) + tableHTML + '</table>');
    }
}

function _userClickedTestament(clicked_id) {
    var clicked_id2 = '#' + clicked_id;
    $('#searchSelectError').text(__s.click_update_when_finish);
    $('#updateRangeButton').show();
    if ($(clicked_id2).hasClass('stepPressedButton')) {
        $(clicked_id2).removeClass('stepPressedButton');
        $("button[id^='" + clicked_id.substring(0, 2) + "_tableg']").each(function (i, el) {
            $(el).removeClass('stepPressedButton');
        });
        $('#updateFeedback').text("Removed \"" + $(clicked_id2).text().replace(/:$/, '') + "\".");
    }
    else {
        $(clicked_id2).addClass('stepPressedButton');
        $("button[id^='" + clicked_id.substring(0, 2) + "_tableg']").each(function (i, el) {
            $(el).addClass('stepPressedButton');
        });
        $('#updateFeedback').text("Added \"" + $(clicked_id2).text().replace(/:$/, '') + "\".");
    }
}

function _userClickedCategory(clicked_id) {
    var clicked_id2 = '#' + clicked_id;
    var categoryName = $(clicked_id2).text();
    $('#searchSelectError').text(__s.click_update_when_finish);
    $('#updateRangeButton').show();
    categoryName = categoryName.replace(/:$/, "");
    if ($(clicked_id2).hasClass('stepPressedButton')) {
        $(clicked_id2).removeClass('stepPressedButton');
        $("button[id^='" + clicked_id + "b']").each(function (i, el) {
            $(el).removeClass('stepPressedButton');
        });
        $(clicked_id2.substring(0, 3) + '_hdr').removeClass('stepPressedButton');
        $('#updateFeedback').text("Removed \"" + $(clicked_id2).text().replace(/:$/, '') + "\".");
    }
    else {
        $(clicked_id2).addClass('stepPressedButton');
        $("button[id^='" + clicked_id + "b']").each(function (i, el) {
            $(el).addClass('stepPressedButton');
        });
        _checkHeaderButton(clicked_id);
        $('#updateFeedback').text("Added \"" + $(clicked_id2).text().replace(/:$/, '') + "\".");
    }
}

function _userClickedBook(clicked_id) {
    var clicked_id2 = '#' + clicked_id;
    $('#searchSelectError').text(__s.click_update_when_finish);
    $('#updateRangeButton').show();
    if ($(clicked_id2).hasClass('stepPressedButton')) {
        $(clicked_id2).removeClass('stepPressedButton');
        var regex = /b\d{1,2}$/;
        var found = clicked_id.match(regex);
        if (found !== null) {
            var tmpID = clicked_id.substring(0, clicked_id.length - found.toString().length);
            $('#' + tmpID).removeClass('stepPressedButton');
        }
        $(clicked_id2.substring(0, 3) + '_hdr').removeClass('stepPressedButton');
        $('#updateFeedback').text(__s.removed + " \"" + $(clicked_id2).text() + "\".");
    }
    else {
        $(clicked_id2).addClass('stepPressedButton');
        var regex = /b\d{1,2}$/;
        var found = clicked_id.match(regex);
        if (found !== null) {
            var tmpID = clicked_id.substring(0, clicked_id.length - found.toString().length);
            var allOn = true;
            $("button[id^='" + tmpID + "b']").each(function (i, el) {
                if (!($(el).hasClass('stepPressedButton'))) allOn = false;
            });
            if (allOn) {
                $('#' + tmpID).addClass('stepPressedButton');
                _checkHeaderButton(clicked_id);
            }
            $('#updateFeedback').text(__s.added + " \"" + $(clicked_id2).text() + "\".");
        }
    }
}

function _checkHeaderButton(clicked_id) {
    var idPrefix = clicked_id.substring(0, 2);
    var numOfGroups = 0;
    //$('#searchSelectError').text(__s.click_update_when_finish);
    //$('#updateRangeButton').show();
    if (idPrefix == 'ot') numOfGroups = groupsOT.length;
    else if (idPrefix == 'nt') numOfGroups = groupsNT.length;
    idPrefix = '#' + idPrefix + '_tableg';
    var allOn = true;
    for (var i = 0; i < numOfGroups; i++) {
        if (!($(idPrefix + i).hasClass('stepPressedButton'))) allOn = false;
    }
    if (allOn) $(idPrefix.substr(0, 3) + '_hdr').addClass('stepPressedButton');
}

function _buildBookTableHeader(columns, htmlID) {
    var modalWidth = $('#' + htmlID).width();
    var firstColumnSize = 145;
    var columnSize = Math.floor((modalWidth - firstColumnSize) / columns);
    
    columnSize = Math.floor((modalWidth - firstColumnSize) / (columns - 1));
    html = '<table>' +
         '<colgroup>' +
         '<col span="1" style="width:' + firstColumnSize + 'px;">';
    for (var i = 1; i < columns; i++) {
        html += '<col span="1" style="width:' + columnSize + 'px;">';
    }
    html += '</colgroup>';
    return html;
}

function _handleEnteredSearchWord(limitType, previousUserInput, userPressedEnterKey) {
    var userInput = '';
    $('#warningMessage').text('');
    if ((typeof previousUserInput === "undefined") || (previousUserInput === null))  userInput =  $('textarea#userTextInput').val();
    else {
        userInput = previousUserInput;
        $('textarea#userTextInput').text(userInput);
    }
    userInput = userInput.replace(/[\n\r]/g, ' ').replace(/\t/g, ' ').replace(/\s\s/g, ' ').replace(/,,/g, ',').replace(/^\s+/g, '');
    searchUserInput = userInput;
    if ((userInput.length > 1) || ((userLang.toLowerCase().startsWith("zh")) && (userInput.length > 0))) {
        $('#updateButton').hide();
        var url;
        if (((typeof limitType === "undefined") || (limitType === null)) && (searchOnSpecificType == ""))
            url = SEARCH_AUTO_SUGGESTIONS + userInput + "/" + VERSION + "%3D" + version + "%7C?lang=" + userLang;
        else {
            if ((typeof limitType === "undefined") || (limitType === null)) limitType = searchOnSpecificType;
            else {
                searchOnSpecificType = limitType;
                searchModalCurrentPage = 2;
            }
            $('#srchModalBackButton').show();
            url = SEARCH_AUTO_SUGGESTIONS + userInput + "/" + VERSION + "%3D" + version + "%7C" + LIMIT + "%3D" + limitType + "%7C?lang=" + userLang;
        }
        $.ajaxSetup({async: false});
        $.getJSON(url, function (data) {
            var searchResultsToDisplay = [];
            for (var i = 0; i < searchTypeCode.length; i++) {
                searchResultsToDisplay.push("");
            }
            for (var i = 0; i < data.length; i++) {
                var searchType = data[i].itemType;
                var searchResultIndex = searchTypeCode.indexOf(searchType);
                switch(searchType) {
                    case GREEK:
                    case GREEK_MEANINGS:
                    case HEBREW:
                    case HEBREW_MEANINGS:
                    case MEANINGS:
                    case SUBJECT_SEARCH:
                    case TEXT_SEARCH:
                        var text2Display = "";
                        if (data[i].grouped) {
                            if (typeof data[i].extraExamples !== "undefined") {
                                for (var k = 0; k < data[i].extraExamples.length; k++) {
                                    if (k > 0) text2Display += ", ";
                                    if ((searchType === GREEK) || (searchType === HEBREW))
                                        text2Display += '<i>' + data[i].extraExamples[k].stepTransliteration + '</i>';
                                    else if ((searchType === GREEK_MEANINGS) || (searchType === HEBREW_MEANINGS) || (searchType === MEANINGS))
                                        text2Display += data[i].extraExamples[k].gloss;
                                    else if (searchType === SUBJECT_SEARCH)
                                        text2Display += data[i].extraExamples[k].value;
                                }
                                if (text2Display.length == 0) console.log('group, but no examples');
                                else {
                                    text2Display += ', ' + __s.etc + '<i style="font-size:12px" class="glyphicon glyphicon-arrow-right"></i>';
                                    if (searchResultsToDisplay[searchResultIndex] !== "") searchResultsToDisplay[searchResultIndex] += "<br>";
                                    searchResultsToDisplay[searchResultIndex] += '<a style="padding:0px;" href="javascript:_handleEnteredSearchWord(\'' + searchType + '\')">' + text2Display + "</a>";
                                }
                            }
                            else {
                                if (searchResultsToDisplay[searchResultIndex] !== "") searchResultsToDisplay[searchResultIndex] += "<br>";
                                searchResultsToDisplay[searchResultIndex] += 'There are ' + data[i].count + ' more options.  Keep typing to see them.';
                            }
                        }
                        else {
                            var str2Search = "";
                            if (searchType === SUBJECT_SEARCH) {
                                text2Display = data[i].suggestion.value;
                                str2Search = text2Display;
                            }
                            else if (searchType === MEANINGS) {
                                text2Display = data[i].suggestion.gloss;
                                str2Search = text2Display;
                            }
                            else if (searchType === TEXT_SEARCH) {
                                if (data[i].suggestion.text.search(/^[HG]\d/i) == -1) { // Make sure it is not a STRONG number (e.g.: H0001)
                                    text2Display = data[i].suggestion.text;
                                    str2Search = text2Display.replace(/["'\u201C\u201D\u2018\u2019]/g, '%22');
                                }
                            }
                            else {
                                text2Display = data[i].suggestion.gloss + ' (<i>' + data[i].suggestion.stepTransliteration +
                                    '</i> - ' + data[i].suggestion.matchingForm + ')';
                                str2Search = data[i].suggestion.strongNumber;
                                searchType = 'strong';
                            }
                            if (searchResultsToDisplay[searchResultIndex] !== "") searchResultsToDisplay[searchResultIndex] += "<br>";
                            searchResultsToDisplay[searchResultIndex] += '<a style="padding:0px;" href="javascript:goSearch(\'' + searchType + '\',\'' + 
                                str2Search + '\',\'' + 
                                text2Display.replace(/["'\u201C\u201D\u2018\u2019]/g, '%22') +
                                '\')">' + text2Display + "</a>";
                        }
                        break;
                    case REFERENCE:
                        if ((data[i].suggestion.sectionType === 'PASSAGE') && (!data[i].suggestion.wholeBook)) {
                            pos = searchUserInput.replace(/\s\s+/, ' ').search(/^\s?[\da-z][a-z]+[\s.]?\d/i);
                            if (pos > -1) {
                                if (userPressedEnterKey) goToPassage(data[0].suggestion.osisID, 0);
                                $('#warningMessage').empty();
                                $('#warningMessage').append('<a href="javascript:step.util.showVideoModal(\'Psalm23.gif\', 15)">You can only search for words and subjects here.  Click to learn how to select passage.<span class="glyphicon glyphicon-film" style="font-size:16px"></span></a>');
                            }
                        }
                        break;
                    default:
                        alert("Unknown result: " + searchType);
                        break;
                }
            }
            for (l = 0; l < searchResultsToDisplay.length; l++) {
                $('#searchResults' + searchTypeCode[l]).html(searchResultsToDisplay[l]);
                if ((typeof limitType === "undefined") || (limitType === null)) $('.select-' + searchTypeCode[l]).show()
                else if (searchResultsToDisplay[l].length > 0) $('.select-' + searchTypeCode[l]).show()
                else $('.select-' + searchTypeCode[l]).hide()
            }
        });
        $.ajaxSetup({async: true});
    }
    else {
        for (l = 0; l < searchTypeCode.length; l++) {
            $('#searchResults' + searchTypeCode[l]).text("");
        }
        showPreviousSearch(); // The update previous search button might need to be displayed if user has includes previous search 
    }
}

function goSearch(searchType, searchWord, displayText) {
    var activePassageData = step.util.activePassage().get("searchTokens") || [];
    var allVersions = "";
    var range = (searchRange === "Gen-Rev") ? "" : "|reference=" + searchRange;
    var currentSearch = "";
    for (var i = 0; i < activePassageData.length; i++) {
        var itemType = activePassageData[i].itemType ? activePassageData[i].itemType : activePassageData[i].tokenType
        switch(itemType) {
            case SYNTAX:
            case TEXT_SEARCH:
            case MEANINGS:
            case SUBJECT_SEARCH:
                break;
            case GREEK:
            case GREEK_MEANINGS:
            case HEBREW:
            case HEBREW_MEANINGS:
                break;
            case REFERENCE:
                break;
            case VERSION:
                if (allVersions.length > 0) allVersions += '|';
                allVersions += 'version=' + activePassageData[i].item.shortInitials;
                break;
            default:
                alert("unknown item type: " + itemType);
                break;
        }
    }
    if (searchType === TEXT_SEARCH) currentSearch = '|syntax=' + searchWord;
    else if (searchType === STRONG_NUMBER) {
        if (!includePreviousSearches) currentSearch = '|strong=' + searchWord;
        else {
            if (searchWord.search(/([GH]\d{4,5})[abcdefg]$/) > -1) searchWord = RegExp.$1; // remove the last character if it is an a-g character
            currentSearch = '|syntax=strong:' + searchWord;
        }
        step.util.putStrongDetails(searchWord, displayText);
    }
    else if (typeof searchType !== "undefined") currentSearch = '|' + searchType + '=' + searchWord;
    var previousSearch = "";
    if (includePreviousSearches) {
        var searchAndOrNot = $("#searchAndOrNot option:selected").val();
        var existingSyntaxSearch = (currentSearch.substr(0, 8) === "|syntax=") ? currentSearch.substr(8) : "";
        var previousSyntaxSearch = "";
        var numOfPreviousSyntaxSearch = 0;
        for (var i = 0; i < previousSearchTokens.length; i++) {
            if (previousSearchTokens[i] !== "") {
                var previousSearchRelationship = $("#searchAndOrNot" + i + " option:selected").val();
                if (typeof previousSearchRelationship !== "undefined") {
                    previousSearchRelationship = " " + previousSearchRelationship + " ";
                }
                else {
                    previousSearchRelationship = " ";
                }
                var curSearchWord = "";
                if (previousSearchTokens[i].substr(0, 5) === "text=") curSearchWord = previousSearchTokens[i].substr(5);
                else if (previousSearchTokens[i].substr(0, 7) === "strong=")
                    curSearchWord = "strong:" + previousSearchTokens[i].substr(7);
                if (curSearchWord !== "") {
                    numOfPreviousSyntaxSearch ++;
                    if (numOfPreviousSyntaxSearch == 1) previousSyntaxSearch =  "|syntax=";
                    else {
                        if (numOfPreviousSyntaxSearch > 2) 
                            previousSyntaxSearch = previousSyntaxSearch.substr(0, 8) + "(" + previousSyntaxSearch.substr(8) + ")";
                        previousSyntaxSearch += previousSearchRelationship;
                    }
                    previousSyntaxSearch += curSearchWord;
                }
                else previousSearch += '|' + previousSearchTokens[i];
            }
        }
        if (previousSyntaxSearch.length > 0) {
            if (existingSyntaxSearch.length > 0) {
                if (numOfPreviousSyntaxSearch >= 2) 
                    previousSyntaxSearch = previousSyntaxSearch.substr(0, 8) + "(" + previousSyntaxSearch.substr(8) + ")";
                currentSearch = previousSyntaxSearch + " " + searchAndOrNot + " " + existingSyntaxSearch;
            }
            else currentSearch = previousSyntaxSearch + currentSearch;
        }
        // if ( ((searchAndOrNot === "OR") || (searchAndOrNot === "NOT")) &&
             // ( (previousSearch !== "") || 
                 // ((searchType !== TEXT_SEARCH) && (searchType !== STRONG_NUMBER)) ) )
                // alert(searchAndOrNot + " search is not available for subject and fuzzy search.  An AND search will be used.");
    }
    var url = allVersions + range + previousSearch + currentSearch;
    var selectedDisplayLoc = $( "#displayLocation option:selected" ).val();
    step.util.closeModal('searchSelectionModal');
//    console.log("navigateSearch from passage_selection.html: " + url);
    if (selectedDisplayLoc === "new") step.util.createNewColumn();
    step.router.navigateSearch(url, true, true);
}

function goToPassage(osisID, chptrOrVrsNum) {
    var modalMode = "";
    var bookID = osisID.substring(0, osisID.indexOf("."));
    if (bookID === "") bookID = osisID;

    var activePassageData = step.util.activePassage().get("searchTokens") || [];
    var allVersions = "";
    var existingReferences = "";
    var selectedDisplayLoc = $( "#displayLocation option:selected" ).val();
    for (var i = 0; i < activePassageData.length; i++) {
        var itemType = activePassageData[i].itemType ? activePassageData[i].itemType : activePassageData[i].tokenType
        if (itemType == "version") {
            if (allVersions.length > 0) allVersions += "|version=";
            allVersions += activePassageData[i].item.shortInitials;
        }
        else if ((selectedDisplayLoc === "append") && (itemType == "reference")) {
            existingReferences += "|reference=" + activePassageData[i].item.osisID;
        }
    }
    step.util.closeModal('searchSelectionModal');
    if (selectedDisplayLoc === "new") {
        step.util.createNewColumn();
    }
//  console.log("navigatePreserveVersions from passage_selection.html: " + osisID);
    step.router.navigatePreserveVersions("reference=" + osisID, false, true);
}

function removePreviousSearch(index) {
    previousSearchTokens[index] = "";
    numOfPreviousSearchTokens --;
    showPreviousSearch();
    $('#lOPS_' + index).hide();
    if (numOfPreviousSearchTokens == 0) {
        $('#previousSearch').empty();
    }
}

function showPreviousSearch() {
    var element = document.getElementById('showprevioussearchonoff');
    if ((element) && (element.checked)) {
        includePreviousSearches = true;
        $('#listofprevioussearchs').show();
        var onlyFoundSubjectOrMeaningsSearch = true;
        for (var i = 0; i < previousSearchTokens.length; i++) {
            if ((previousSearchTokens[i] !== "") &&
                (!previousSearchTokens[i].startsWith(MEANINGS)) &&
                (!previousSearchTokens[i].startsWith(SUBJECT_SEARCH)))
                onlyFoundSubjectOrMeaningsSearch = false;
        }
        if (onlyFoundSubjectOrMeaningsSearch) $('#searchAndOrNot').hide();
        else $('#searchAndOrNot').show();
        if (searchUserInput.length == 0) { 
            if ((rangeWasUpdated) || (andOrNotUpdated) ||
                (numOfPreviousSearchTokens != previousSearchTokens.length)) $('#updateButton').show();
        }
        handlePreviousSearchAndOrNot();
    }
    else {
        includePreviousSearches = false;
        $('#listofprevioussearchs').hide();
        $('#searchAndOrNot').hide();
        $('#updateButton').hide();
        $("#searchResultssubject").show();
        $("#searchResultsmeanings").show();
        $("#searchResultssubjectWarn").hide();
        $("#searchResultsmeaningsWarn").hide();
    }
}

function handleAndOrNot() {
    andOrNotUpdated = true;
    $('#updateButton').show();
}

function handlePreviousSearchAndOrNot() {
    var searchAndOrNot = $("#searchAndOrNot option:selected").val();
    if (searchAndOrNot === "AND") {
        $("#searchResultssubject").show();
        $("#searchResultsmeanings").show();
        $("#searchResultssubjectWarn").hide();
        $("#searchResultsmeaningsWarn").hide();
    }
    else {
        $("#searchResultssubject").hide();
        $("#searchResultsmeanings").hide();
        $("#searchResultssubjectWarn").show();
        $("#searchResultsmeaningsWarn").show();

    }
}