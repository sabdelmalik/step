var PassageMenuView = Backbone.View.extend({
    events: {
        "click a[name]": "updateModel",
        "click .showStats": "showAnalysis",
        "click .smallerFontSize": "decreaseFontSize",
        "click .largerFontSize": "increaseFontSize",
        "click .previousChapter": "goToPreviousChapter",
        "click .nextChapter": "goToNextChapter",
        "click .closeColumn" : "closeColumn"
    },
    el: function () {
        return step.util.getPassageContainer(this.model.get("passageId")).find(".passageOptionsGroup");
    },
    items: [
        { initial: "H", key: "display_headings" },
        { initial: "V", key: "display_verseNumbers" },
        { initial: "L", key: "display_separateLines" },
        { initial: "R", key: "display_redLetter" },
        { initial: "N", key: "display_notes" },
        { initial: "E", key: "display_englishVocab" },
        { initial: "A", key: "display_greekVocab" },
        { initial: "D", key: "display_divide_hebrew", help: "display_divide_hebrew_help" },
        { initial: "G", key: "display_greek_pointing", help: "display_greek_accents_help" },
        { initial: "U", key: "display_hebrew_vowels", help: "display_hebrew_vowels_help" },
        { initial: "P", key: "display_pointing_include_hebrew", help: "display_pointing_include_hebrew_vowels_help" },
        { initial: "T", key: "display_transliteration" },
        { initial: "M", key: "display_grammar" },
        { initial: "C", key: "display_grammarColor" }
    ],

    initialize: function () {
        var self = this;
        _.bindAll(this);

        //listen for model changes
        this.listenTo(this.model, "sync-update", this._updateVisibleDropdown);
        this.listenTo(this.model, "destroy-columns", this.remove);
        
        //get the versions data sources
        for (var i = 0; i < step.datasources.length; i++) {
            if (step.datasources.at(i).get("name") == DS_VERSIONS) {
                this.versions = step.datasources[i];
            }
        }

        this.listenTo(this.$el, 'show.bs.dropdown', function (ev) {
            if (!self.rendered) {
                require(["defaults"], function () {
                    self._initUI();
                    self.rendered = true;
                    self._updateDropdownContents(ev.target);
                });
            } else {
                self._updateDropdownContents(ev.target);
            }
        });
    },
    _updateVisibleDropdown: function () {
        var openDropdown = this.$el.find(".dropdown.open");
        if (this._isDisplayOptionsDropdown(openDropdown)) {
            this._updateColumnOptions();
        }
    },
    _updateDropdownContents: function (targetTrigger) {
        if (this._isDisplayOptionsDropdown(targetTrigger)) {
            this._updateColumnOptions();
        } else if (this._isShareDropdown(targetTrigger)) {
            this._doSocialButtons();
        }
    },
    _isDisplayOptionsDropdown: function (target) {
        return $(target).has(">.showSettings").length > 0;
    },
    _isShareDropdown: function (target) {
        return $(target).has(">.dropdown-share").length > 0;
    },
    _updateColumnOptions: function () {
        if (this.model == undefined || step.keyedVersions == undefined || !this.rendered) {
            console.log("Unable to find a passage");
            return;
        }

        var masterVersion = step.keyedVersions[this.model.get("masterVersion")];
        this._updateDisplayModeOptions(masterVersion);
        this._updateDisplayOptions();
    },
    /**
     * Obtains the options available in the masterVersion.
     * Then only makes those available. If we're in an interlinear mode, then
     * we need to further disable those options that are not available...
     * @param passage the passage model data
     * @private
     */
    _updateDisplayOptions: function () {
        //first set the available options to be visible, and non-available options to be invisible...
        var availableOptions = this.model.get("options") || "";
        var isPassage = this.model.get("searchType") == "PASSAGE";
        
        //make invisible all options except for 'available ones'
        var displayOptions = this.displayOptions.find("li.passage");
        for (var i = 0; i < displayOptions.length; i++) {
            var displayOption = displayOptions.eq(i);
            displayOption.toggle(isPassage && availableOptions.indexOf(displayOption.find("[data-value]").attr("data-value")) != -1);
        }
    },
    _updateSearchOptions: function() {
        
    },
    _updateDisplayModeOptions: function (masterVersion) {
        //set the current display mode.
        this.displayModeContainer.find(".glyphicon").removeClass("active");
        this.displayModeContainer
            .find("[data-value='" + this.model.get("interlinearMode") + "']")
            .find(".glyphicon").addClass("active");


        //depending on the version selected, we show the various options
        var extraVersions = this.model.get("extraVersions");

        //remove any empty string...
        if (extraVersions == undefined || extraVersions == "") {
            extraVersions = [];
        } else {
            extraVersions = extraVersions.split(",");
        }

        if (extraVersions.length == 0) {
            this.displayModeContainer.hide();
            return;
        } else {
            this.displayModeContainer.show();
        }

        var allHaveStrong = masterVersion.hasStrongs;
        var sameLanguage = true;
        var masterLanguage = masterVersion.languageCode;
        for (var ii = 0; ii < extraVersions.length; ii++) {
            var extraResource = step.keyedVersions[extraVersions[ii]];
            allHaveStrong = allHaveStrong && extraResource.hasStrongs;
            sameLanguage = sameLanguage && extraResource.languageCode == masterLanguage;
        }

        this.displayModeContainer.find("a[data-value='INTERLINEAR']").closest("li").toggle(allHaveStrong);
        this.displayModeContainer.find("a[data-value='INTERLEAVED_COMPARE']").closest("li").toggle(sameLanguage);
        this.displayModeContainer.find("a[data-value='COLUMN_COMPARE']").closest("li").toggle(sameLanguage);
    },
    showAnalysis: function () {
        //trigger side bar
        require(["sidebar"], function(module) {
            //TODO TODO TODO
            //read up on requirejs to see if init can form part of download call
            step.util.ui.initSidebar('analysis');
            //TODO TODO TODO
        });
    },

    _initUI: function () {
        //create settings dropdown
        var dropdownContainer = $("<div>").addClass("dropdown-menu pull-right").attr("role", "menu");
        this.displayModeContainer = $("<div>");
        var displayMode = $("<h1>").append(__s.display_mode);
        this.displayModeContainer.append(displayMode);
        this.displayModeContainer.append(this._createDisplayModes());
        dropdownContainer.append(this.displayModeContainer);

        var displayOptionsHeading = $("<h1>").append(__s.display_options);
        dropdownContainer.append(displayOptionsHeading);

        this.displayOptions = this._createDisplayOptions();
        dropdownContainer.append(this.displayOptions);

        var shareDropdownMenu = $("<div>").addClass("dropdown-menu pull-right").attr("role", "menu");

        this.$el.find(".dropdown:has(.dropdown-share)").append(shareDropdownMenu);
        this.$el.find(".dropdown:has(.showSettings)").append(dropdownContainer);
    },
    _createDisplayModes: function () {
        var interOptions = step.defaults.passage.interOptions;
        var interNamesOptions = step.defaults.passage.interNamedOptions;

        var displayModes = $("<ul>").addClass("miniKolumny displayModes");
        for (var i = 0; i < interOptions.length; i++) {
            var link = this._createLink(interNamesOptions[i], interOptions[i]);
            displayModes.append($("<li>").append(link).attr("role", "presentation"));
        }


        var self = this;
        displayModes.find('a').click(function (e) {
            e.stopPropagation();
            displayModes.find('a').not(this).find(".glyphicon").removeClass("active");
            $(this).find('.glyphicon').addClass("active");
            self._updateOptions();
        });

        return displayModes;
    },
    _createDisplayOptions: function() {
        var dropdown = $("<ul>").addClass("miniKolumny passageOptions");
        dropdown.append(this._createPassageOptions(dropdown)).append(this._createSearchOptions(dropdown));
        return dropdown;
    },
    getContextLabel: function (context) {
        return sprintf(__s.search_context, context);
    }, _createSearchOptions: function(dropdown) {
        var self = this;
        var context = this.model.get("context") || 0;
        
        var li = $('<li class="contextContainer">').append($('<span class="contextLabel"></span>').append(this.getContextLabel(context)));
        li.append($('<span class="btn-group"></span>')
            .append('<button class="btn btn-default btn-xs"><span class="glyphicon glyphicon-minus"></span></button>')
            .append('<button class="btn btn-default btn-xs"><span class="glyphicon glyphicon-plus"></span></button>'));
        
        
        li.find("button").click(function(ev) {
            ev.stopPropagation();
            //need to trigger new search after setting value of model 
            var contextVal = self.model.get("context");
            var increment = $(this).find(".glyphicon-minus").length ? -1 : 1;
            if(step.util.isBlank(contextVal)) {
                contextVal = 0;
            } else if(isNaN(contextVal)) {
                contextVal = 0;
            } else {
                contextVal = parseInt(contextVal);
            }
            contextVal += increment;
            if(contextVal < 0) {
                contextVal = 0;
            }
            $(this).closest("li").find(".contextLabel").html(self.getContextLabel(contextVal));
            self.model.save({ context:  contextVal});

        });
        //create context link
        dropdown.append(li);
        return dropdown;
        
    },
    _createPassageOptions: function (dropdown) {
        var selectedOptions = this.model.get("selectedOptions") || "";

        for (var i = 0; i < this.items.length; i++) {
            var link = this._createLink(this.items[i].initial, __s[this.items[i].key], __s[this.items[i].help]);

            this._setVisible(link, selectedOptions.indexOf(this.items[i].initial) != -1);
            dropdown.append($("<li>").addClass("passage").append(link)).attr("role", "presentation");
        }

        var self = this;
        dropdown.find('a').click(function (e) {
            e.stopPropagation();
            self._setVisible($(this), $(this).find('.glyphicon').css("visibility") == 'hidden');
            self._updateOptions();
        });
        return dropdown;
    },
    
    _createLink: function (value, text, title) {
        return $('<a></a>')
            .attr("href", "javascript:void(0)")
            .attr("data-value", value)
            .attr("title", title)
            .append(step.util.ui.selectMark())
            .append("<span>" + text + "</span>");
    },
    _updateAvailableOptions: function () {
        console.log("updating options");
    },
    _updateOptions: function () {
        //update the model
        var selectedOptions = this.$el.find("[data-selected='true']");
        var selectedCode = "";
        for (var i = 0; i < selectedOptions.length; i++) {
            selectedCode += selectedOptions.eq(i).data('value');
        }

        var passageOptions = this.model.get("data") || {};
        var clonedPassageOptions = _.clone(passageOptions) || {};
        clonedPassageOptions.selectedOptions = selectedCode;
        clonedPassageOptions.interlinearMode = this.displayModeContainer.find("a:has(.glyphicon.active)").attr("data-value");

        this.model.save({
            data: clonedPassageOptions
        });
        return selectedCode;
    },

    _setVisible: function (link, visible) {
        link.find(".glyphicon").css("visibility", visible ? "visible" : "hidden");
        link.attr("data-selected", visible);
    },

    _doSocialButtons: function () {
        step.util.activePassageId(this.model.get("passageId"));
        if (step.state.isLocal()) {
            return;
        }

        var element = this.$el.find(".dropdown-share").closest(".dropdown").find(".dropdown-menu");
        if (!this.sharingBar) {
            this.sharingBar = $("<ul>");
            element.append(this.sharingBar);
        } else {
            this.sharingBar.empty();
        }

        var url = step.router.getShareableColumnUrl(element, true);

        //do google plus
        if (window.gapi != undefined) {
            var gPlusOne = $('<g:plusone size="medium"></g:plusone>');
            gPlusOne.attr("href", url);
            this.sharingBar.append($("<li>").append(gPlusOne));
            window.gapi.plusone.go(this.sharingBar.get(0));
        }

        //do twitter
        if (window.twttr != undefined) {
            var twitter = $('<a href="https://twitter.com/share" class="twitter-share-button" data-via="Tyndale_House">Tweet</a>')
            twitter.attr("data-url", url);
            twitter.attr("data-text", $("title").text());
            this.sharingBar.append($("<li>").append(twitter));
            window.twttr.widgets.load();
        }

        //do facebook share
        if(window.FB && window.FB.XFBML) {
            var facebook = $('<fb:share-button type="button_count"></fb:share-button>').attr("href", url);
            this.sharingBar.append($("<li>").append(facebook));
            window.FB.XFBML.parse(facebook.parent().get(0));
        }
    },
    decreaseFontSize: function() {
        step.util.activePassageId(this.model.get("passageId"));
        step.util.changeFontSize(this.$el, -1);
    },
    increaseFontSize: function() {
        step.util.activePassageId(this.model.get("passageId"));
        step.util.changeFontSize(this.$el, 1);
    },
    goToPreviousChapter: function() {
        this.goToSiblingChapter(this.model.get("previousChapter"));
    },
    goToNextChapter: function() {
        this.goToSiblingChapter(this.model.get("nextChapter"));
    },
    goToSiblingChapter: function(key) {
        step.util.activePassageId(this.model.get("passageId"));
        
        var args = this.model.get("args");
        
        //remove all references from the args
        args = args
            .replace(/reference=[0-9a-zA-Z :.;-]+/ig, "")
            .replace(/&&/ig, "")
            .replace(/&$/ig, "");
        
        if(args.length >0) {
            args += "&";
        }
        args += "reference=" + key.osisKeyId;
        step.router.navigateSearch(args);
    },
    /**
     * Closes the whole column by removing it from the DOM
     */
    closeColumn : function() {
        this.model.trigger("destroy-column");
    }
});