var ExamplesView = Backbone.View.extend({
	exampleTemplate: _.template(
		'<div id="welcomeExamples" class="passageContainer examplesContainer">' +
			'<a class="closeColumn" title="<%= __s.close %> />">' +
				'<i class="glyphicon glyphicon-remove"></i>' +
			'</a>' +
			'<h3><%= __s.simple_intro_welcome %></h3>' +
			'<p><%= __s.simple_intro %></p>' +
			'<div class="accordion-row" data-row="0">' +
				'<h5 class="accordion-heading stepButton"><%= __s.quick_tutorial_header1 %>' +
					'<span class="plusminus">+</span>' +
				'</h5>' +
				'<div class="accordion-body">' +
					'<br>' +

					'<span class="input-group" style="overflow:hidden">' +
					'<a href="/?q=version=ESV|reference=Ps.23&options=VHNUG" title="<%= __s.click_to_try_this %>">' +
					'<span class="argSummary argSumSpan">' +
					'<span class="argSelect stepButton">ESV</span><span class="argSelect stepButton">Psalm 23</span></span>' +
					'</a>' +
					'</span>' +
					'<span class="explanationText"><%= __s.simple_passage_explanation %></span>' +
					'<a id="firstVideoLink" href="javascript:step.util.showVideoModal(\'Psalm23.gif\', 15)">&nbsp;' +
					'<span class="glyphicon glyphicon-film" style="font-size:16px"></span></a>' +

					'<span class="input-group" style="overflow:hidden">' +
					'<a href="/?q=version=NIV|version=ESV|version=KJV|reference=Joh.3&options=HVGUN&display=COLUMN" title="<%= __s.click_to_try_this %>">' +
					'<span class="argSummary argSumSpan">' +
					'<span class="argSelect stepButton">NIV, ESV, KJV</span><span class="argSelect stepButton">John 3</span></span>' +
					'</a>' +
					'</span>' +
					'<span class="explanationText"><%= __s.multiple_versions_explanation %></span>' +
   					'<a href="javascript:step.util.showVideoModal(\'John3.gif\', 27)">&nbsp;<span class="glyphicon glyphicon-film" style="font-size:16px"></span></a>' +
					
					'<span class="input-group" style="overflow:hidden">' +
					'<a href="/?q=version=ESV|strong=G0080&options=HVNGU" title="<%= __s.click_to_try_this %>">' +
					'<span class="argSummary argSumSpan">' +
					'<span class="argSelect stepButton">ESV</span><span class="argSelect stepButton"><span class="glyphicon glyphicon-search" style="font-size:12px"></span><span> brother</span></span></span>' +
					'</a>' +
					'</span>' +
					'<span class="explanationText"><%= __s.simple_search_explanation %></span>' +
   					'<a href="javascript:step.util.showVideoModal(\'ESV_brother.gif\', 39)">&nbsp;<span class="glyphicon glyphicon-film" style="font-size:16px"></span></a>' +

					'<span class="input-group" style="overflow:hidden">' +
						'<a href="/?q=version=NIV|version=ESV|text=land|strong=H2617a&options=VGUVNH&display=INTERLEAVED" title="<%= __s.click_to_try_this %>">' +
						'<span class="argSummary argSumSpan">' +
						'<span class="argSelect stepButton">NIV, ESV</span><span class="argSelect stepButton"><span class="glyphicon glyphicon-search" style="font-size:12px"></span><span> land,&nbsp;</span><span class="transliteration" style="color:#498090;line-height:13px">he.sed</span></span></span>' +
						'</a>' +
					'</span>' +
					'<span class="explanationText"><%= __s.chained_searches_explanation %></span>' +
   					'<a href="javascript:step.util.showVideoModal(\'ESV_NIV_land_chesed.gif\', 65)">&nbsp;<span class="glyphicon glyphicon-film" style="font-size:16px"></span></a>' +

					'<span class="input-group" style="overflow:hidden">' +
					'<a href="/?q=version=ESV|meanings=throne|subject=david|reference=Isa-Rev&options=HNVUG" title="<%= __s.click_to_try_this %>">' +
						'<span class="argSummary argSumSpan">' +
							'<span class="argSelect stepButton">ESV</span>' +
							'<span class="argSelect stepButton">' +
								'<span class="glyphicon glyphicon-search" style="font-size:12px"></span>' +
								'<span> throne, David (Isa-Rev)</span>' +
							'</span>' +
						'</span>' +
					'</a>' +
					'</span>' +
					'<span class="explanationText"><%= __s.chained_searches_explanation_subject %></span>' +
   					'<a href="javascript:step.util.showVideoModal(\'ESV_Isa_Rev_throne_david.gif\', 63)">&nbsp;<span class="glyphicon glyphicon-film" style="font-size:16px"></span></a>' +

					'<span class="input-group" style="overflow:hidden">' +
						'<a href="javascript:cf.setNextPageURL(\'/?q=version=ESV|reference=1Jo.1&options=HVGUN\', \'function:openStats\', \'esv_word_frequency_explanation\')" title="<%= __s.click_to_try_this %>">' +
							'<span class="argSummary argSumSpan">' +
							'<span class="argSelect stepButton">ESV</span><span class="argSelect stepButton">1Jo 1</span>' +
							'&nbsp;<span class=\'glyphicon glyphicon-stats\' style="line-height:13px;color:#498090"></span>' +
						'</a>' +
					'</span>' +
					'<span class="explanationText"><%= __s.esv_word_frequency_explanation %></span>' +
  					'<a href="javascript:step.util.showVideoModal(\'1Joh_passage_analysis.gif\', 12)">&nbsp;<span class="glyphicon glyphicon-film" style="font-size:16px"></span></a>' +

					'<br><br><a href="javascript:step.util.showIntro(true)">' +
					'<span id="quickTour"><span style="font-size:14px;font-weight:bold;color:black">Quick tour</span>' +
					'<br><span class="explanationText">Take a quick tour of the new user interface.</span>' +
					'</span>' +
					'</a>' +
                    '<span class="explanationText">  Or see a quick introduction in the </span>' +
                    '<a href="https://drive.google.com/drive/folders/19OgRWS8Rbk92V5zAETpJ14QFSNjf76um">' +
                    'user guide.</a>' +

					'<br><br><div id="classicalUIVideo"><span style="font-size:14px;font-weight:bold;color:black">Old user interface</span>' +
					'<br><span class="explanationText">STEP Bible has improved the user interface. We do not recommend the old user interface, but it is available in case you prefer the old input line, the following video shows how to re-enable the old input line.</span>' +
					'<a href="javascript:step.util.showVideoModal(\'ClassicalUI.gif\', 16)">&nbsp;<span class="glyphicon glyphicon-film" style="font-size:16px"></span></a>' +
					'</div>' +
					
				'</div>' +
			'</div>' +
			'<div class="accordion-row" data-row="1">' +
				'<h5 class="accordion-heading stepButton"><%= __s.quick_tutorial_header2 %>' +
					'<span class="plusminus">+</span>' +
				'</h5>' +
				'<div class="accordion-body">' +
					'<br>' +
					
					'<span class="input-group" style="overflow:hidden">' +
					'<a href="/?q=version=KJV|version=THGNT|reference=John.1&options=HVLUNM&display=INTERLINEAR" title="<%= __s.click_to_try_this %>">' +
					'<span class="argSummary argSumSpan">' +
					'<span class="argSelect stepButton">KJV, THGNT</span><span class="argSelect stepButton">John 1</span></span>' +
					'</a>' +
					'</span>' +
					'<span class="explanationText"><%= __s.interlinear_grammar_explanation %></span>' +
   					'<a href="javascript:step.util.showVideoModal(\'KJV_THGNT_John1.gif\', 35)">&nbsp;<span class="glyphicon glyphicon-film" style="font-size:16px"></span></a>' +

					'<span class="input-group" style="overflow:hidden">' +
					'<a href="/?q=version=OHB|version=ESV&options=LVUMCHN&display=INTERLINEAR" title="<%= __s.click_to_try_this %>">' +
					'<span class="argSummary argSumSpan">' +
					'<span class="argSelect stepButton">OHB, ESV</span><span class="argSelect stepButton">Gen 1</span></span>' +
					'</a>' +
					'</span>' +
					'<span class="explanationText"><%= __s.interlinear_ot_explanation %></span>' +
   					'<a href="javascript:step.util.showVideoModal(\'OHB_ESV_Gen1.gif\', 40)">&nbsp;<span class="glyphicon glyphicon-film" style="font-size:16px"></span></a>' +

					'<span class="input-group" style="overflow:hidden">' +
                    '<a href="/?q=version=ESV|reference=John.1&options=TLHVAGUN" title="<%= __s.click_to_try_this %>">' +
					'<span class="argSummary argSumSpan">' +
					'<span class="argSelect stepButton">ESV</span><span class="argSelect stepButton">John 1</span>' +
					'&nbsp;<span class=\'glyphicon glyphicon-cog\' style="line-height:13px;color:#498090">&nbsp;</span><span style="line-height:13px;color:#498090"><%= __s.display_greekVocab %></span></span>' +
					'</a>' +
					'</span>' +
					'<span class="explanationText"><%= __s.vocab_explanation %></span>' +
   					'<a href="javascript:step.util.showVideoModal(\'ESV_orig_voc_transliteration.gif\', 35)">&nbsp;<span class="glyphicon glyphicon-film" style="font-size:16px"></span></a>' +

					'<span class="input-group" style="overflow:hidden">' +
                    '<a href="?q=version=LXX|version=AB|version=ABGk|version=ABEn|reference=Exod.31&options=VLGUHVNAT&display=INTERLEAVED" title="<%= __s.click_to_try_this %>">' +
					'<span class="argSummary argSumSpan">' +
					'<span class="argSelect stepButton">LXX, AB, ABGk, ABEn</span><span class="argSelect stepButton">Exo 31</span>' +
					'</a>' +
					'</span>' +
					'<span class="explanationText"><b>The Septuagint (OT in Greek)</b> older versions (“LXX” is Rhalfs) and later ecclesiastical versions (ABGr).</span>' +

					'<span class="input-group" style="overflow:hidden">' +
                    '<a href="?q=version=ESV|version=THOT|version=ABGk|version=ABEn|reference=Isa.53.1 John.12.38&options=VVNH&display=COLUMN&pos=1" title="<%= __s.click_to_try_this %>">' +
					'<span class="argSummary argSumSpan">' +
					'<span class="argSelect stepButton">ESV, THOT, ABGk, ABEn</span><span class="argSelect stepButton">Isa 53:1, Joh 12:38</span>' +
					'</a>' +
					'</span>' +
					'<span class="explanationText"><b>Compare and search Greek in OT & NT.</b> Most English tagged versions are linked with Hebrew OT and Greek NT. A few are linked with Greek OT & NT.</span>' +

				'</div>' +
			'</div>' +
			'<div class="accordion-row" data-row="2">' +
				'<h5 class="accordion-heading stepButton"><%= __s.quick_tutorial_header3 %>' +
					'<span class="plusminus">+</span>' +
				'</h5>' +
				'<div class="accordion-body">' +
					'<br>' +

					'<span class="input-group" style="overflow:hidden">' +
					'<a href="javascript:cf.setNextPageURL(\'/?q=version=KJV|reference=Col.3&options=HVGUNC\', \'verb, imperative mood\', \'kjv_verb_imperative_explanation\')" title="<%= __s.click_to_try_this %>">' +
					'<span class="argSummary argSumSpan">' +
					'<span class="argSelect stepButton">KJV</span><span class="argSelect stepButton">Col 3</span>' +
					'&nbsp;<span class=\'glyphicon glyphicon-cog\' style="line-height:13px;color:#498090">&nbsp;</span><span style="line-height:13px;color:#498090"><%= __s.display_grammarColor %></span></span>' +
					'</a>' +
					'</span>' +
					'<span class="explanationText"><%= __s.kjv_verb_imperative_explanation %></span>' +
   					'<a href="javascript:step.util.showVideoModal(\'color_code_1.gif\', 93)">&nbsp;<span class="glyphicon glyphicon-film" style="font-size:16px"></span></a>' +

					'<span class="input-group" style="overflow:hidden">' +
					'<a href="javascript:cf.setNextPageURL(\'/?q=version=KJV|reference=Col.1&options=HVGUNC\', \'verb, main vs supporting verbs\', \'kjv_verb_main_supporting_explanation\')" title="<%= __s.click_to_try_this %>">' +
					'<span class="argSummary argSumSpan">' +
					'<span class="argSelect stepButton" style="line-height:13px">KJV</span>' +
					'<span class="argSelect stepButton" style="line-height:13px">Col 1</span>' +
					'&nbsp;<span class=\'glyphicon glyphicon-cog\' style="line-height:13px;color:#498090">&nbsp;</span><span style="line-height:13px;color:#498090"><%= __s.display_grammarColor %></span></span>' +
					'</a>' +
					'</span>' +
					'<div class="explanationText"><%= __s.kjv_verb_main_supporting_explanation %></div>' +
					
					'<span class="input-group" style="overflow:hidden">' +
					'<a href="javascript:cf.setNextPageURL(\'/?q=version=KJV|reference=Mat.1&options=HVGUNC\', \'gender and number\', \'kjv_verb_number_and_gender_explanation\')" title="<%= __s.click_to_try_this %>">' +
					'<span class="argSummary argSumSpan">' +
					'<span class="argSelect stepButton">KJV</span><span class="argSelect stepButton">Mat 1</span>' +
					'&nbsp;<span class=\'glyphicon glyphicon-cog\' style="line-height:13px;color:#498090">&nbsp;</span><span style="line-height:13px;color:#498090"><%= __s.display_grammarColor %></span></span>' +
					'</a>' +
					'</span>' +
					'<div class="explanationText"><%= __s.kjv_verb_number_and_gender_explanation %></div>' +

					'<span class="input-group" style="overflow:hidden">' +
					'<a href="javascript:cf.setNextPageURL(\'/?q=version=KJV|reference=Eph.1&options=HVGUNC\', \'verb, gender and number\', \'look_at_color_table\')" title="<%= __s.click_to_try_this %>">' +
					'<span class="argSummary argSumSpan">' +
					'<span class="argSelect stepButton">KJV</span><span class="argSelect stepButton">Eph 1</span>' +
					'&nbsp;<span class=\'glyphicon glyphicon-cog\' style="line-height:13px;color:#498090">&nbsp;</span><span style="line-height:13px;color:#498090"><%= __s.display_grammarColor %></span></span>' +
					'</a>' +
					'</span>' +
					'<div class="explanationText"><%= __s.kjv_verb_colour_explanation %></div>' +
					
					'<span class="input-group" style="overflow:hidden">' +
					'<a href="javascript:cf.setNextPageURL(\'/?q=version=SBLG|reference=Rom.12&options=CEMVALHUN\', \'verb, gender and number\', \'look_at_color_table\')" title="<%= __s.click_to_try_this %>">' +
					'<span class="argSummary argSumSpan">' +
					'<span class="argSelect stepButton">SBLG</span><span class="argSelect stepButton">Rom 12</span>' +
					'&nbsp;<span class=\'glyphicon glyphicon-cog\' style="line-height:13px;color:#498090">&nbsp;</span><span style="line-height:13px;color:#498090"><%= __s.display_grammarColor %></span></span>' +
					'</a>' +
					'</span>' +
                   
					'<div class="explanationText">Look at Greek New Testament with color code grammar, Greek root word and English vocabulary</div>' +
					'<span class="input-group" style="overflow:hidden">' +
					'<a href="javascript:cf.setNextPageURL(\'/?q=version=THOT|reference=Gen.1&options=HVLUNC\', \'verb, gender and number\', \'\')" title="<%= __s.click_to_try_this %>">' +
					'<span class="argSummary argSumSpan">' +
					'<span class="argSelect stepButton">THOT</span><span class="argSelect stepButton">Gen 1</span>' +
					'&nbsp;<span class=\'glyphicon glyphicon-cog\' style="line-height:13px;color:#498090">&nbsp;</span><span style="line-height:13px;color:#498090"><%= __s.display_grammarColor %></span></span>' +
					'</a>' +
					'</span>' +
					'<div class="explanationText">Look at Hebrew Testament with color code grammar and morphology information in the lexicon</div>' +
					
					'<span class="input-group" style="overflow:hidden">' +
					'<a href="javascript:cf.setNextPageURL(\'/?q=version=CUn|reference=Col.1&options=HVGUNC\', \'verb, gender and number\', \'look_at_color_table\')" title="<%= __s.click_to_try_this %>">' +
					'<span class="argSummary argSumSpan">' +
					'<span class="argSelect stepButton">CUn</span><span class="argSelect stepButton">Col 1</span>' +
					'&nbsp;<span class=\'glyphicon glyphicon-cog\' style="line-height:13px;color:#498090">&nbsp;</span><span style="line-height:13px;color:#498090"><%= __s.display_grammarColor %></span></span>' +
					'</a>' +
					'</span>' +
					'<div class="explanationText">Look at Chinese Union New Testament with color highlighted verbs</div>' +
					
					'<span class="input-group" style="overflow:hidden">' +
					'<a href="javascript:cf.setNextPageURL(\'/?q=version=SBLG|version=KJV|version=CUn|reference=Eph.5&options=CVLHUVNEAM&display=INTERLEAVED\', \'verb, gender and number\', \'look_at_color_table\')" title="<%= __s.click_to_try_this %>">' +
					'<span class="argSummary argSumSpan">' +
					'<span class="argSelect stepButton">SBLG, KJV, CUn</span><span class="argSelect stepButton">Eph 5</span>' +
					'&nbsp;<span class=\'glyphicon glyphicon-cog\' style="line-height:13px;color:#498090">&nbsp;</span><span style="line-height:13px;color:#498090"><%= __s.display_grammarColor %></span></span>' +
					'</a>' +
					'</span>' +
					'<div class="explanationText"><%= __s.interlinear_verb_color_explanation %></div><div id=\'colorCodeTableDiv\'></div>' +
				'</div>' +
			'</div>' +
			'<div class="text-muted step-copyright">' +
				'<span>&copy; <a href="https://stepbibleguide.blogspot.com/p/copyrights-licences.html" target="_blank">STEPBible</a> - 2021</span>' +
			'</div>' +
		'</div>'
	),
    events: {
        'click .closeColumn': 'onClickClose',
        'click .accordion-heading': 'onClickHeading',
		'click .plusminus': 'onClickHeading'
    },
    initialize: function () {
        this.render();
    },
    render: function () {
		if ($('#welcomeExamples').length == 0) {
			this.$el.append(this.exampleTemplate);
			this.initAccordions();
		}
        var classicalUISetting = (window.localStorage) ? window.localStorage.getItem("step.classicalUI") : $.cookie('step.classicalUI');
		if (classicalUISetting === "true") $('#classicalUIVideo').hide();
		else $('#classicalUIVideo').show();
    },
    initAccordions: function () {
        var count = this.$el.find(".accordion-row").length;
        var hasStoredState = false;
        var timesDisplayedKey = "accordionTimesDisplayed";
		var timesDisplayed = localStorage.getItem(timesDisplayedKey);
		if (timesDisplayed == null) timesDisplayed = 1;
		else timesDisplayed ++;
		
        for (var i = 0; i < count; i++) {
            if (localStorage.getItem("displayQuickTryoutAccordion" + i) === "true") {
                hasStoredState = true;
				var index = i;
				if (timesDisplayed > 4) {
					index = (i + 1) % count;
					timesDisplayed = 1;
				}
                this.toggleAccordion(index, count);
            }
        }
        if (!hasStoredState) this.toggleAccordion(0, count);
		localStorage.setItem(timesDisplayedKey, timesDisplayed);
    },
    toggleAccordion: function (index, accordionCount) {
        var query = ".accordion-row[data-row=" + index + "]";
        var $accordionRow = this.$el.find(query);
        var $accordionBody = $accordionRow.find(".accordion-body");
        var storageKey = "displayQuickTryoutAccordion" + index;
		var displayFlag = false;
		if (typeof accordionCount === "number") {
			displayFlag = true;
			for (var i = 0; i < accordionCount; i++) {
				localStorage.setItem("displayQuickTryoutAccordion" + i, "false") ;
			}
		}
        if ( (!$accordionBody.is(":visible")) || (displayFlag) ) {
            $accordionRow.find(".accordion-body").slideDown();
			$accordionRow.find(".accordion-heading").addClass('stepPressedButton');
            $accordionRow.find(".plusminus").text("-");
            localStorage.setItem(storageKey, "true");
        }
        else {
            $accordionRow.find(".accordion-body").slideUp();
			$accordionRow.find(".accordion-heading").removeClass('stepPressedButton');
            $accordionRow.find(".plusminus").text("+");
            localStorage.setItem(storageKey, "false");
        }
    },
    onClickHeading: function (event) {
		event.stopImmediatePropagation();
		event.stopPropagation(); //prevent the bubbling up
        var target = $(event.target);
        var accordionRow = target.parent();
		if ($(accordionRow).find('.accordion-heading').length == 0) accordionRow = $(accordionRow).parent();
        var index = accordionRow.attr("data-row");
        this.toggleAccordion(index);
    },
    onClickClose: function () {
        step.util.showOrHideTutorial(true);
    },
	showVideoModal: function (videoFile) {
        var element = document.getElementById('videoModal');
        if (element) element.parentNode.removeChild(element);
        var videoModalDiv = $('<div id="videoModal" class="modal selectModal" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-test="' + videoFile + '">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">');
        videoModalDiv.appendTo("body");
        $('#videoModal').modal('show').find('.modal-content').load('/html/video_modal.html');
    }
});
