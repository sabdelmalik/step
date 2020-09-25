/*******************************************************************************
 * Copyright (c) 01, Directors of the Tyndale STEP Project
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without 
 * modification, are permitted provided that the following conditions 
 * are met:
 *
 * Redistributions of source code must retain the above copyright 
 * notice, this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright 
 * notice, this list of conditions and the following disclaimer in 
 * the documentation and/or other materials provided with the 
 * distribution.
 * Neither the name of the Tyndale House, Cambridge (www.TyndaleHouse.com)  
 * nor the names of its contributors may be used to endorse or promote 
 * products derived from this software without specific prior written 
 * permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT 
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS 
 * FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE 
 * COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, 
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, 
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; 
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER 
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT 
 * LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING 
 * IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF 
 * THE POSSIBILITY OF SUCH DAMAGE.
 ******************************************************************************/
package com.tyndalehouse.step.models.info;

import com.tyndalehouse.step.core.data.EntityDoc;
import com.tyndalehouse.step.core.models.LexiconSuggestion;
import com.tyndalehouse.step.core.service.helpers.OriginalWordUtils;
import com.tyndalehouse.step.core.utils.StringUtils;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

/**
 * Captures information related to morphology
 *
 * @author chrisburrell
 */
public class VocabInfo implements Serializable {
    private static final int MAX_QUICK_DEF_LENGTH = 255;
    private static final long serialVersionUID = 3478149117983010944L;
    private String alternativeTranslit1;
    private String alternativeTranslit1Unaccented;
    private String lsjDefs;
    private String strongNumber;
    private String accentedUnicode;
    private String unaccentedUnicode;
    private String strongTranslit;
    private String strongPronunc;
    private List<LexiconSuggestion> relatedNos;
    private String shortDef;
    private String mediumDef;
    private String zh_tw_Gloss;
    private String zh_Gloss;
    private String zh_tw_Definition;
    private String zh_Definition;
	private String vi_Definition;
    private String stepGloss;
    private String stepTransliteration;
    private String unaccentedStepTransliteration;
    private String twoLetterLookup;
    private String rawRelatedNumbers;
    private Integer count;

    /**
     * for serialisation
     */
    public VocabInfo() {
        // no-op
    }

    /**
     * constructs a vocab info from a {@link EntityDoc}.
     *
     * @param d              see a document representing a lexicon definition
     * @param relatedVocabs  the related vocabs, but also could contain tags non related to this document.
     * @param includeAllInfo true to include all information
     */
    public VocabInfo(final EntityDoc d, final Map<String, List<LexiconSuggestion>> relatedVocabs,
                     final boolean includeAllInfo, final String userLanguage) {
        this.accentedUnicode = d.get("accentedUnicode");
        this.shortDef = d.get("shortDefinition");
        this.stepGloss = d.get("stepGloss");
        this.stepTransliteration = d.get("stepTransliteration");
        this.mediumDef = d.get("mediumDefinition");
        if ((userLanguage == null) || (userLanguage == "") || (userLanguage.equalsIgnoreCase("zh"))) {
            this.zh_Gloss = d.get("zh_Gloss");
            this.zh_Definition = d.get("zh_Definition");
        }
        else if ((userLanguage == null) || (userLanguage == "") || (userLanguage.equalsIgnoreCase("zh_tw"))) {
            this.zh_tw_Gloss = d.get("zh_tw_Gloss");
            this.zh_tw_Definition = d.get("zh_tw_Definition");
        }
        else if ((userLanguage == null) || (userLanguage == "") || (userLanguage.equalsIgnoreCase("vi"))) {
            this.vi_Definition = d.get("vi_Definition");
        }

        final String popularity = d.get("popularity");
        
        if(StringUtils.isNotBlank(popularity)) {
            if (popularity.matches("^\\d+")) {
                this.count = Integer.parseInt(popularity);
            }
            else this.count = 0;
        }

        if (includeAllInfo) {
            this.lsjDefs = d.get("lsjDefinition");
            this.strongNumber = d.get("strongNumber");
            this.twoLetterLookup = d.get("twoLetter");

            if (this.strongNumber != null) {
                this.relatedNos = relatedVocabs.get(this.strongNumber);
            }
        } else {
            this.rawRelatedNumbers = OriginalWordUtils.stripExtensions(d.get("relatedNumbers"));
        }
    }


    /**
     * @return the alternativeTranslit1
     */
    public String getAlternativeTranslit1() {
        return this.alternativeTranslit1;
    }

    /**
     * @param alternativeTranslit1 the alternativeTranslit1 to set
     */
    public void setAlternativeTranslit1(final String alternativeTranslit1) {
        this.alternativeTranslit1 = alternativeTranslit1;
    }

    /**
     * @return the alternativeTranslit1Unaccented
     */
    public String getAlternativeTranslit1Unaccented() {
        return this.alternativeTranslit1Unaccented;
    }

    /**
     * @param alternativeTranslit1Unaccented the alternativeTranslit1Unaccented to set
     */
    public void setAlternativeTranslit1Unaccented(final String alternativeTranslit1Unaccented) {
        this.alternativeTranslit1Unaccented = alternativeTranslit1Unaccented;
    }

    /**
     * @return the lsjDefs
     */
    public String getLsjDefs() {
        return this.lsjDefs;
    }

    /**
     * @param lsjDefs the lsjDefs to set
     */
    public void setLsjDefs(final String lsjDefs) {
        this.lsjDefs = lsjDefs;
    }

    /**
     * @return the strongNumber
     */
    public String getStrongNumber() {
        return this.strongNumber;
    }

    /**
     * @param strongNumber the strongNumber to set
     */
    public void setStrongNumber(final String strongNumber) {
        this.strongNumber = strongNumber;
    }

    /**
     * @return the accentedUnicode
     */
    public String getAccentedUnicode() {
        return this.accentedUnicode;
    }

    /**
     * @param accentedUnicode the accentedUnicode to set
     */
    public void setAccentedUnicode(final String accentedUnicode) {
        this.accentedUnicode = accentedUnicode;
    }

    /**
     * @return the unaccentedUnicode
     */
    public String getUnaccentedUnicode() {
        return this.unaccentedUnicode;
    }

    /**
     * @param unaccentedUnicode the unaccentedUnicode to set
     */
    public void setUnaccentedUnicode(final String unaccentedUnicode) {
        this.unaccentedUnicode = unaccentedUnicode;
    }

    /**
     * @return the strongTranslit
     */
    public String getStrongTranslit() {
        return this.strongTranslit;
    }

    /**
     * @param strongTranslit the strongTranslit to set
     */
    public void setStrongTranslit(final String strongTranslit) {
        this.strongTranslit = strongTranslit;
    }

    /**
     * @return the strongPronunc
     */
    public String getStrongPronunc() {
        return this.strongPronunc;
    }

    /**
     * @param strongPronunc the strongPronunc to set
     */
    public void setStrongPronunc(final String strongPronunc) {
        this.strongPronunc = strongPronunc;
    }

    /**
     * @return the relatedNos
     */
    public List<LexiconSuggestion> getRelatedNos() {
        return this.relatedNos;
    }

    /**
     * @param relatedNos the relatedNos to set
     */
    public void setRelatedNos(final List<LexiconSuggestion> relatedNos) {
        this.relatedNos = relatedNos;
    }

    /**
     * @return the shortDef
     */
    public String getShortDef() {
        return this.shortDef;
    }

    /**
     * @param shortDef the shortDef to set
     */
    public void setShortDef(final String shortDef) {
        this.shortDef = shortDef;
    }

    /**
     * @return the mediumDef
     */
    public String getMediumDef() {
        return this.mediumDef;
    }

    /**
     * @param mediumDef the mediumDef to set
     */
    public void setMediumDef(final String mediumDef) {
        this.mediumDef = mediumDef;
    }

    /**
     * @return the zh_tw_Def
     */
    public String get_zh_tw_Definition() {
        return this.zh_tw_Definition;
    }

    /**
     * @param zh_tw_Definition the zh_tw_Def to set
     */
    public void set_zh_tw_Definition(final String zh_tw_Definition) {
        this.zh_tw_Definition = zh_tw_Definition;
    }

    /**
     * @return the zh_Definition
     */
    public String get_zh_Definition() {
        return this.zh_Definition;
    }

    /**
     * @param zh_Definition the zh_Definition to set
     */
    public void set_zh_Definition(final String zh_Definition) {
        this.zh_Definition = zh_Definition;
    }

    /**
     * @return the traditional Chinese Gloss
     */
    public String get_zh_tw_Gloss() {
        return this.zh_tw_Gloss;
    }

    /**
     * @param zh_tw_Gloss the zh_tw_Gloss to set
     */
    public void set_zh_tw_Gloss(final String zh_tw_Gloss) {
        this.zh_tw_Gloss = zh_tw_Gloss;
    }

    /**
     * @return the simplified Chinese Gloss
     */
    public String get_zh_Gloss() {
        return this.zh_Gloss;
    }

    /**
     * @param zh_Gloss the zh_Gloss to set
     */
    public void set_zh_Gloss(final String zh_Gloss) {
        this.zh_Gloss = zh_Gloss;
    }

    /**
     * @return the vi_Definition
     */
    public String get_vi_Definition() {
        return this.vi_Definition;
    }

    /**
     * @param vi_Definition the vi_Definition to set
     */
    public void set_vi_Definition(final String vi_Definition) {
        this.vi_Definition = vi_Definition;
    }

    /**
     * @return the stepGloss
     */
    public String getStepGloss() {
        return this.stepGloss;
    }

    /**
     * @param stepGloss the stepGloss to set
     */
    public void setStepGloss(final String stepGloss) {
        this.stepGloss = stepGloss;
    }

    /**
     * @return the stepTransliteration
     */
    public String getStepTransliteration() {
        return this.stepTransliteration;
    }

    /**
     * @param stepTransliteration the stepTransliteration to set
     */
    public void setStepTransliteration(final String stepTransliteration) {
        this.stepTransliteration = stepTransliteration;
    }

    /**
     * @return the unaccentedStepTransliteration
     */
    public String getUnaccentedStepTransliteration() {
        return this.unaccentedStepTransliteration;
    }

    /**
     * @param unaccentedStepTransliteration the unaccentedStepTransliteration to set
     */
    public void setUnaccentedStepTransliteration(final String unaccentedStepTransliteration) {
        this.unaccentedStepTransliteration = unaccentedStepTransliteration;
    }

    /**
     * @return the twoLetterLookup
     */
    public String getTwoLetterLookup() {
        return this.twoLetterLookup;
    }

    /**
     * @param twoLetterLookup the twoLetterLookup to set
     */
    public void setTwoLetterLookup(final String twoLetterLookup) {
        this.twoLetterLookup = twoLetterLookup;
    }

    /**
     * @return * A comma-space-separated list of the related numbers
     */
    public String getRawRelatedNumbers() {
        return rawRelatedNumbers;
    }

    /**
     * @param rawRelatedNumbers the list of related numbers
     */
    public void setRawRelatedNumbers(final String rawRelatedNumbers) {
        this.rawRelatedNumbers = rawRelatedNumbers;
    }

    /**
     * @return The number of occurences of a particular strong number
     */
    public Integer getCount() {
        return count;
    }
}
