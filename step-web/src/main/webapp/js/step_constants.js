// ///////////////////////////////////////////////////////////////////////
// The following section defines method names and controller names
// These are used as part of the rest-like calls
// ///////////////////////////////////////////////////////////////////////
VERSION = "version";
REFERENCE = "reference";
LIMIT="limit";
TEXT_SEARCH = "text";
EXAMPLE_DATA = "examples";
SYNTAX = "syntax";
GREEK_MEANINGS = "greekMeanings";
GREEK = "greek";
HEBREW_MEANINGS = "hebrewMeanings";
HEBREW = "hebrew";
STRONG_NUMBER = "strong";
MEANINGS = "meanings";
SUBJECT_SEARCH = "subject";
NAVE_SEARCH = "nave";
NAVE_SEARCH_EXTENDED = "xnave";
TOPIC_BY_REF = "topicref";
RELATED_VERSES = "relatedrefs";
EXACT_FORM = "exactForm";
REF_VERSION = "ESV";
VOCAB_SORT = "VOCABULARY";
ORIGINAL_SPELLING_SORT = "ORIGINAL_SPELLING";
SCRIPTURE_SORT = "SCRIPTURE";

KEY_PAUSE=200;
MOUSE_PAUSE=200;

DS_VERSIONS = "allVersions";
if (typeof STEP_SERVER_BASE_URL === "undefined") STEP_SERVER_BASE_URL = "/rest/";
else {
    // var supportForTLS = false;
	// var userAgentVersion = 0;
	// var userAgent = window.navigator.userAgent.toLowerCase();
    // Internet Explorer 11 and lower (MSIE test)
    // if (userAgent.indexOf('msie ') > -1) {
        // userAgentVersion = Number(userAgent.split('msie ')[1].split('.')[0]);
        // if (userAgentVersion > 10) supportForTLS = true;
    // Internet Explorer (some versions, but checking for 11+) (Trident test)
    // } else if (userAgent.indexOf('trident/') > -1) { //Internet Explorer (by Trident if MSIE is missing)
        // var tridentVersion = Number(userAgent.split('trident/')[1].split('.')[0]);
        // if (tridentVersion > 6) supportForTLS = true;
    // Safari
    // } else if ( ((userAgent.indexOf('iphone') > -1) || (userAgent.indexOf('ipad') > -1)) &&
				// (userAgent.indexOf('safari') > -1) ) {
		// var number1 = /os\s(\d+)/.test(userAgent) ? RegExp.$1 : '0';
		// var number2 = /^_(\d+)/.test(RegExp.rightContext) ? RegExp.$1 : '0';
		// userAgentVersion = number1 + '.' + number2;
        // if (userAgentVersion > 8.1) supportForTLS = true;
    // Chrome, Edge
    // } else if (userAgent.indexOf('applewebkit/') > -1) {
        // userAgentVersion = Number(userAgent.split('applewebkit/')[1].split('.')[0]);
        // if (userAgentVersion > 536) supportForTLS = true;
    // Firefox
    // } else if (userAgent.indexOf('firefox/') > -1) {
        // userAgentVersion = Number(userAgent.split('firefox/')[1].split('.')[0]);
        // if (userAgentVersion > 26) supportForTLS = true;
    // Opera
    // } else if (userAgent.indexOf('opera/') > -1) {
        // userAgentVersion = Number(userAgent.split('opera/')[1].split('.')[0]);
        // if (userAgentVersion > 13) supportForTLS = true;
    // }
    // if (!supportForTLS) STEP_SERVER_BASE_URL = "/rest/";
	if (STEP_SERVER_BASE_URL.indexOf("https://api-") == 0) {
		$.ajaxSetup({async: false});
		$.getJSON(STEP_SERVER_BASE_URL.slice(0, -5) + "test/short.json", function(whatever) {
		}).fail(function() {
			STEP_SERVER_BASE_URL = "/rest/";
		});
		$.ajaxSetup({async: true});
	}
}

BOOKMARKS_GET =                     STEP_SERVER_BASE_URL + "favourites/getBookmarks";
BOOKMARKS_ADD =                     STEP_SERVER_BASE_URL + "favourites/addBookmark/";
HISTORY_GET =                       STEP_SERVER_BASE_URL + "favourites/getHistory/";
HISTORY_ADD =                       STEP_SERVER_BASE_URL + "favourites/addHistory/";

ALTERNATIVE_TRANSLATIONS =          STEP_SERVER_BASE_URL + "alternativeTranslations/get/";
ANALYSIS_STATS =                    STEP_SERVER_BASE_URL + "analysis/analyseStats/";

BIBLE_GET_MODULES =                 STEP_SERVER_BASE_URL + "bible/getModules/";
BIBLE_GET_BIBLE_TEXT =              STEP_SERVER_BASE_URL + "bible/getBibleText/";
BIBLE_GET_FEATURES =                STEP_SERVER_BASE_URL + "bible/getFeatures/";
BIBLE_GET_ALL_FEATURES =            STEP_SERVER_BASE_URL + "bible/getAllFeatures/";
BIBLE_GET_BIBLE_BOOK_NAMES =        STEP_SERVER_BASE_URL + "bible/getBibleBookNames/";
BIBLE_GET_NEXT_CHAPTER =            STEP_SERVER_BASE_URL + "bible/getNextChapter/";
BIBLE_GET_PREVIOUS_CHAPTER =        STEP_SERVER_BASE_URL + "bible/getPreviousChapter/";
BIBLE_CONVERT_VERSIFICATION =       STEP_SERVER_BASE_URL + "bible/convertReferenceForBook/";
BIBLE_GET_BY_NUMBER =               STEP_SERVER_BASE_URL + "bible/getBibleByVerseNumber/";
BIBLE_GET_KEY_INFO =                STEP_SERVER_BASE_URL + "bible/getKeyInfo/";
BIBLE_EXPAND_TO_CHAPTER =           STEP_SERVER_BASE_URL + "bible/expandKeyToChapter/";
BIBLE_GET_STRONGS_AND_SUBJECTS =    STEP_SERVER_BASE_URL + "bible/getStrongNumbersAndSubjects/";

DICTIONARY_GET_BY_HEADWORD =        STEP_SERVER_BASE_URL + "dictionary/lookupDictionaryByHeadword/";
DICTIONARY_SEARCH_BY_HEADWORD =     STEP_SERVER_BASE_URL + "dictionary/searchDictionaryByHeadword/";

MODULE_GET_ALL_MODULES =            STEP_SERVER_BASE_URL + "module/getAllModules/";
MODULE_GET_ALL_INSTALLABLE_MODULES= STEP_SERVER_BASE_URL + "module/getAllInstallableModules/";
MODULE_GET_INFO =                   STEP_SERVER_BASE_URL + "module/getInfo/";
MODULE_GET_QUICK_INFO =             STEP_SERVER_BASE_URL + "module/getQuickInfo/";
MODULE_ADD_DIRECTORY_INSTALLER =    STEP_SERVER_BASE_URL + "module/addDirectoryInstaller";

SETUP_INSTALL_FIRST_TIME =          STEP_SERVER_BASE_URL + "setup/installFirstTime/";
SETUP_GET_PROGRESS =                STEP_SERVER_BASE_URL + "setup/getProgress/";
SETUP_IS_COMPLETE =                 STEP_SERVER_BASE_URL + "setup/isInstallationComplete/";
SETUP_GET_INSTALLERS =              STEP_SERVER_BASE_URL + "setup/getInstallers";
SETUP_INSTALL_BIBLE =               STEP_SERVER_BASE_URL + "setup/installBible/";
SETUP_PROGRESS_INSTALL =            STEP_SERVER_BASE_URL + "setup/getProgressOnInstallation/";
SETUP_PROGRESS_INDEX =              STEP_SERVER_BASE_URL + "setup/getProgressOnIndexing/";
SETUP_REMOVE_MODULE =               STEP_SERVER_BASE_URL + "setup/removeModule/";
SETUP_REINDEX =                     STEP_SERVER_BASE_URL + "setup/reIndex/";

SEARCH_MASTER =                     STEP_SERVER_BASE_URL + "search/masterSearch/";
SEARCH_AUTO_SUGGESTIONS =           STEP_SERVER_BASE_URL + "search/suggest/";
SEARCH_DEFAULT =                    STEP_SERVER_BASE_URL + "search/search/";
SEARCH_ESTIMATES =                  STEP_SERVER_BASE_URL + "search/estimateSearch/";
SEARCH_SUGGESTIONS =                STEP_SERVER_BASE_URL + "search/getExactForms/";
SUBJECT_SUGGESTION =                STEP_SERVER_BASE_URL + "search/autocompleteSubject/"
SUBJECT_VERSES =                    STEP_SERVER_BASE_URL + "search/getSubjectVerses/";

SUPPORT_CREATE =                    STEP_SERVER_BASE_URL + "support/createRequest/"

TIMELINE_GET_EVENTS =               STEP_SERVER_BASE_URL + "timeline/getEvents/";
TIMELINE_GET_EVENTS_IN_PERIOD =     STEP_SERVER_BASE_URL + "timeline/getEventsInPeriod/";
TIMELINE_GET_EVENTS_FROM_REFERENCE= STEP_SERVER_BASE_URL + "timeline/getEventsFromReference/";
TIMELINE_GET_CONFIGURATION =        STEP_SERVER_BASE_URL + "timeline/getTimelineConfiguration";
TIMELINE_GET_EVENT_INFO =           STEP_SERVER_BASE_URL + "timeline/getEventInformation/";

GEOGRAPHY_GET_PLACES =              STEP_SERVER_BASE_URL + "geography/getPlaces/";

USER_CHECK =                        STEP_SERVER_BASE_URL + "user/checkValidUser/";

//deliberately no final slash, as mimicking a REST interface for backbone
NOTES_BASE =                        STEP_SERVER_BASE_URL + "notes/notes";
