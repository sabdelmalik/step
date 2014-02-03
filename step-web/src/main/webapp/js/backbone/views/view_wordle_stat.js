var ViewLexiconWordle = Backbone.View.extend({
    events: {
    },
    minFont: 9,
    minSubjectFont: 12,
    maxFont: 24,
    passageId: 0,

    initialize: function () {
        var self = this;
        this.isAnimating = false;

        var scopeContainer = $("<form class='scopeContainer '>");

        this.wordType = this.populateMenu(step.defaults.analysis.kind,  step.defaults.analysis.kindTypes, __s.analyse_label, "wordType");
        this.wordScope = this.populateMenu(step.defaults.analysis.scope, step.defaults.analysis.scopeType, __s.bible_text, "wordScope", true);
        this.sortCloud = $('<input type="checkbox" id="sortByFrequency" checked="checked" class="pull-right" />');
        this.animateCloud = $('<button class="btn btn-default btn-xs pull-right" id="animateWordle"><span type="button" class="glyphicon glyphicon-play" /></button>');
        this.statsContainer = $('<div id="statsContainer"></div>');

        this.addRefreshStats(this.animateCloud);
        this.addRefreshStats(this.sortCloud);
        
        scopeContainer.append(this.wordType);
        scopeContainer.append(this.wordScope);
        scopeContainer.append(this.scope);
        scopeContainer.append(
            $('<div class="formGroup"><label for="sortByFrequency">' + __s.analyse_sort_label + '</label></div>').append(this.sortCloud));

        scopeContainer.append(
            $('<div class="formGroup"><label for="animateWordle">' + __s.analyse_animate_label + '</label></div>').append(this.animateCloud));

        this.$el.append(scopeContainer);
        this.$el.append(this.statsContainer);

        this.animateCloud.click(function(ev) {
            event.preventDefault();
            self.animateWordleHandler(); 
        });

        this.listenToModels();
    },
    refresh: function() {
        if(this.$el.hasClass("active")) {
            this.doStats();
        }
    },

    addRefreshStats: function(el) {
        var self = this;
        el.click(function() { self.doStats() });
    },
    
    getCloudContainer: function (statsTab) {
        return statsTab.find(".cloudContainer");
    },

    populateMenu: function (data, values, label, id, includeText) {
        var self = this;
        
        //create form group
        var formGroup = $('<div class="form-group">');
        var label = $('<label></label>').append(label).attr("for", id);

        //create a button menu
        var buttonGroup = $('<div class="btn-group pull-right"></div>').attr("id", id);
        var value = $('<span></span>');
        var button = $('<button type="button" data-toggle="dropdown" class="btn btn-default btn-xs dropdown-toggle"></div>')
            .append(value).append('<span class="caret"></span>');


        //get max length
        var menu = $('<ul class="dropdown-menu" role="menu"></ul>');

        if (includeText) {
            var activePassageData = step.util.activePassage();
            var activeReference = activePassageData.get("reference");
            var textReference = $('<input type="text" />')
                .attr("placeholder", __s.analyse_book_ref)
                .val(activeReference);
            textReference.data(data[0]);
            var li = $('<li role="presentation"></li>');
            var link = $("<a></a>");
            link.append(step.util.ui.selectMark()).append(textReference);
            li.append(link);
            menu.append(li);
            li.addClass("selected").find(".glyphicon").addClass("active");
            li.data("value", activeReference);
        }

        for (var i = includeText ? 1 : 0; i < data.length; i++) {
            var link = $('<a role="menuitem" tabIndex="-1" href="javascript:void(0)">' + data[i] + '</a>');
            var li = $('<li role="presentation"></li>');
            li.append(link.prepend(step.util.ui.selectMark()));

            if (!includeText && i == 0) {
                li.addClass("selected").find(".glyphicon").addClass("active");
            } 
            li.data("value",values[i]);
            menu.append(li);
        }

        var firstLi = menu.find("li:first");
        if(firstLi.text() == "") {
            value.html(firstLi.find("input").val());
        } else {
            value.html(firstLi.text());
        }

        menu.find("a").click(function () {
            var link = $(this)
            var linkText = link.text();
            if(linkText == "") {
                var newRef = link.find("input").val();
                value.html(newRef);
                link.closest("li").data("value", newRef);
            } else {
                value.html(linkText);
            }
            
            link.closest("ul").find("li").removeClass("selected").find(".active").removeClass("active");
            link.parent().addClass("selected").find(".glyphicon").addClass("active");
            self.doStats();
        });

        menu.find("input").click(function (e) {
            e.stopPropagation();
        }).on("keydown", function (event) {
            event.stopPropagation();
            var code = (event.keyCode ? event.keyCode : event.which);
            if (code == 13) {
                event.preventDefault();
                var input = $(this);
                value.html(input.val());
                input.closest("ul").removeClass("selected");
                input.closest("li").addClass("selected").data("value", input.val());
                self.doStats();
            }
        });

        formGroup.append(label);
        buttonGroup.append(button);
        buttonGroup.append(menu);
        formGroup.append(buttonGroup);
        return formGroup;
    },

    listenToModels: function () {
        //update the model, in case we're not looking at the right one.
//        this.listenTo(Backbone.Events, "passage:rendered:0", function () {
//            this.doStats(PassageModels.at(0));
//        });
//        this.listenTo(Backbone.Events, "passage:rendered:1", function () {
//            this.doStats(PassageModels.at(1));
//        });
    },

    _getStats: function (statType, scope, title, callback, animate) {
        var self = this;
        var model = step.util.activePassage();

        var modelReference = model.get("reference");
        var modelVersion = model.get("masterVersion");
        var reference = this.isAnimating ? this.transientReference || modelReference : modelReference;

        var scopeTypes = step.defaults.analysis.scopeType;
        if(scopeTypes.indexOf(scope) == -1) {
            this.transientReference = reference = scope;
            scope = scopeTypes[0];
        }
        
        if (!animate) {
            this.statsContainer.empty();
        }

        var lastTime = new Date().getTime();
        $.getSafe(ANALYSIS_STATS, [modelVersion, reference, statType, scope, animate == true], function (data) {
            step.util.trackAnalytics('wordle', 'loaded', new Date().getTime() - new Date().getTime());
            step.util.trackAnalytics('wordle', 'type', statType);
            step.util.trackAnalytics('wordle', 'scope', scope);
            self.transientReference = data.passageStat.reference.name;

            //we're going to animate this, but we're going to finish and not keep going if the flag is set
            if (data.passageStat.reference.lastChapter) {
                self.animateWordleHandler();
            }

            self._createWordleTab(self.statsContainer, scope, title, data.passageStat, statType, callback, data.lexiconWords, animate);
        });
    },

    animateWordleHandler: function () {
        this.isAnimating = !this.isAnimating;
        if (this.isAnimating) {
            this.previousSortValue = this.sortCloud.prop('checked');
            this.sortCloud.prop("checked", true).button("disable");

            this.previousScopeValue = this.wordScope.html();
            
            //TODO : some refactoring here to centralise the 'selecting' service.
            
            this.wordScope.data(step.defaults.analysis.scope[1]).prop("disabled", true);
            
            this.animateCloud.find(".glyphicon").removeClass("glyphicon-play").addClass("glyphicon-pause");
            
            this.doStats();
        } else {
            this.sortCloud.prop("checked", this.previousSortValue || false).button("enable");

            this.wordScope.html(this.previousScopeValue).prop("disabled", false);
            this.animateCloud.find(".glyphicon").addClass("glyphicon-play").removeClass("glyphicon-pause");
        }
        this.animateCloud.button("refresh").blur();
    },

    /**
     * Gets the stats for a passage and shows a wordle
     * @private
     */
    doStats: function () {
        console.log("Doing stats");

        this._getStats(this.wordType.find(".selected").data("value"), this.wordScope.find(".selected").data("value"), __s.word_cloud, function (key, statType) {
            var otherPassage = step.util.getOtherPassageId(step.lexicon.passageId);
            if (statType == 'WORD') {
                step.lexicon.sameWordSearch(key);
            } else if (statType == 'TEXT') {
                var textModel = SimpleTextModels.at(otherPassage);
                textModel.save({
                    detail: 0,
                    //exact words
                    simpleTextTypePrimary: step.defaults.search.textual.simpleTextTypesReference[2],
                    simpleTextCriteria: key
                });
                textModel.trigger("search", textModel, {});
                step.state.view.ensureTwoColumnView();
            } else if (statType == 'SUBJECT') {
                //first change the fieldset:
                var subjectModel = SubjectModels.at(otherPassage);
                subjectModel.save({
                    subjectText: key,
                    subjectSearchType: step.defaults.search.subject.subjectTypes[1],
                    subjectRelated: "",
                    detail: 0
                });

                subjectModel.trigger("search", subjectModel, {});
                step.state.view.ensureTwoColumnView();
            }
        }, this.isAnimating);
    },

    /**
     * Creates a new wordle link
     * @param value the number of times a word occurs
     * @param scope the scope of the stat display (book/chapter/etc.)
     * @param lexiconWords the lexicon words
     * @param key the key, i.e. word, accented unicode, etc.
     * @returns {*|jQuery}
     */
    createWordleLink: function (key, value, scope, statType, lexiconWords, callback) {
        var analysisConstants = step.defaults.analysis;
        var scopeText = analysisConstants.scope[analysisConstants.scopeType.indexOf(scope)];
         
        var wordLink = $("<a></a>")
            .attr('href', 'javascript:void(0)')
            .attr('rel', value)
            .attr('title', sprintf(__s.stats_occurs_times, value, scopeText));

        if (lexiconWords && lexiconWords[key]) {
            //assume key is a strong number
            var fontClass = step.util.ui.getFontForStrong(key);

            if (lexiconWords[key].matchingForm) {
                wordLink.append(lexiconWords[key].gloss);
                var ancientVocab = $("<span></span>").addClass(fontClass).append(lexiconWords[key].matchingForm);
                wordLink.append(' (');
                wordLink.append(ancientVocab);
                wordLink.append(')');
                wordLink.prop("strong", key);
            } else {
                wordLink.append(lexiconWords[key].gloss);
            }
        } else {
            wordLink.html(key)
        }

        wordLink.attr("key", key);

        wordLink.click(function () {
            callback(key, statType);
        });
        return wordLink;
    },

    /**
     * @param container the container where the content will be put
     * @param scope chapter/nearby chapter/book
     * @param title the title of the tab
     * @param wordleData the actual data to be rendered
     * @param statType WORD / SUBJECT/ TEXT
     * @param callback the callback when a word is clicked
     * @param lexiconWords the lexicon words
     * @param animate - true to indicate previous results weren't cleared, and that an animation is required
     * @private
     */
    _createWordleTab: function (container, scope, title, wordleData, statType, callback, lexiconWords, animate) {
        var self = this;

        //create order of strong numbers
        var strongs = [];
        $.each(wordleData.stats, function (key, value) {
            strongs.push(key);
        });

        var shouldSort = this.sortCloud.prop("checked");
        if (shouldSort) {
            strongs.sort(function (a, b) {
                return wordleData.stats[b] - wordleData.stats[a];
            });
        } else {
            strongs.sort(function (a, b) {
                return a.toLowerCase() < b.toLowerCase() ? -1 : 1;
            });
        }

        $("a", container).attr("rel", 0);

        $.each(strongs, function (index, key) {
            var value = wordleData.stats[key];

            var wordLink;
            if (animate) {
                //then try and find the link first
                var foundLink = $("[key='" + key + "']");
                if (foundLink.length > 0) {
                    wordLink = foundLink;
                    wordLink.attr('rel', value)
                        .attr('title', sprintf(__s.stats_occurs_times, value, scope));
                }
            }

            //if we're still null, then create the link
            if (wordLink == null) {
                wordLink = self.createWordleLink(key, value, scope, statType, lexiconWords, callback);

                //we set the font size to 0
                if (animate) {
                    wordLink.css("font-size", 0);
                }
                container.append(wordLink);
                container.append(" ");
            }
        });

        var links = $("a", container);
        links.tagcloud({
            size: {
                start: statType == "SUBJECT" ? self.minSubjectFont : self.minFont,
                end: self.maxFont,
                unit: "px"
            },
            animate: animate
        });

        if (statType == 'WORD') {
            links.hover(
                function () {
                    step.passage.higlightStrongs({
                        strong: $(this).prop("strong")
                    });
                }, function () {
                    step.passage.removeStrongsHighlights(step.passage.getPassageId(this));
                }
            );
        }

        //base it on the isAnimating rather than passed in value
        if (this.isAnimating) {
            delay(function () {
                self.doStats();
            }, 3500);
        }
    }
});
