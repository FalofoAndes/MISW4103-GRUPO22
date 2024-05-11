Feature: Modify Page in Ghost
  As an user I want to modify my pages to update my content


@user1 @web
Scenario Outline: Modify Page title in Ghost 
  Given I navigate to page "<URL>"
  And I take a screenshot "FeatureModifyPage" "SC1Step1"
  And I login "<USERNAME1>" "<PASSWORD1>"
  And I take a screenshot "FeatureModifyPage" "SC1Step2"
  When I navigate to page "<URL_PAGES>"
  And I wait for 4 seconds
  And I take a screenshot "FeatureModifyPage" "SC1Step3"
  And I click view with selector ".ember-view.gh-btn.gh-btn-primary.view-actions-top-row"
  And I wait for 2 seconds
  And I take a screenshot "FeatureModifyPage" "SC1Step4"
  And I click view with selector ".gh-editor-title.ember-text-area.gh-input.ember-view"
  And I enter text "Title"
  And I wait for 2 seconds
  And I take a screenshot "FeatureModifyPage" "SC1Step5"
  And I click view with selector ".koenig-editor__editor.__mobiledoc-editor.__has-no-content"
  And I enter text "Content"
  And I wait for 2 seconds
  And I take a screenshot "FeatureModifyPage" "SC1Step6"
  And I clic in back button
  And I wait for 2 seconds
  And I take a screenshot "FeatureModifyPage" "SC1Step7"
  And I click view with selector "li.gh-list-row.gh-posts-list-item a.gh-list-data.gh-post-list-title"
  And I wait for 2 seconds
  And I take a screenshot "FeatureModifyPage" "SC1Step8"
  And I click view with selector ".gh-editor-title.ember-text-area.gh-input.ember-view"
  And I clear title
  And I enter text "New Title"
  And I wait for 2 seconds
  And I take a screenshot "FeatureModifyPage" "SC1Step9"
  And I clic in back button
  And I wait for 2 seconds
  And I take a screenshot "FeatureModifyPage" "SC1Step10"
  Then I see the first page in list with name "New Title"


@user2 @web
Scenario Outline: Modify Page to change the Url in Ghost
  Given I navigate to page "<URL>"
  And I take a screenshot "FeatureModifyPage" "SC2Step1"
  And I login "<USERNAME1>" "<PASSWORD1>"
  And I take a screenshot "FeatureModifyPage" "SC2Step2"
  When I navigate to page "<URL_PAGES>"
  And I wait for 4 seconds
  And I take a screenshot "FeatureModifyPage" "SC2Step3"
  And I click view with selector ".ember-view.gh-btn.gh-btn-primary.view-actions-top-row"
  And I wait for 2 seconds
  And I take a screenshot "FeatureModifyPage" "SC2Step4"
  And I click view with selector ".gh-editor-title.ember-text-area.gh-input.ember-view"
  And I enter text "Title"
  And I wait for 2 seconds
  And I take a screenshot "FeatureModifyPage" "SC2Step5"
  And I click view with selector ".koenig-editor__editor.__mobiledoc-editor.__has-no-content"
  And I enter text "Content"
  And I wait for 2 seconds
  And I take a screenshot "FeatureModifyPage" "SC2Step6"
  And I clic in back button
  And I wait for 2 seconds
  And I take a screenshot "FeatureModifyPage" "SC2Step7"
  And I click view with selector "li.gh-list-row.gh-posts-list-item a.gh-list-data.gh-post-list-title"
  And I wait for 2 seconds
  And I take a screenshot "FeatureModifyPage" "SC2Step8"
  When I click view with selector ".settings-menu-toggle.gh-btn.gh-btn-editor.gh-btn-icon.icon-only.gh-btn-action-icon"
  And I wait for 2 seconds
  And I take a screenshot "FeatureModifyPage" "SC2Step9"
  And I enter url "<PAGE_TEST>"
  And I wait for 2 seconds
  And I take a screenshot "FeatureModifyPage" "SC2Step10"
  And I click view with selector ".gh-btn.gh-btn-editor.darkgrey.gh-publish-trigger"
  And I wait for 3 seconds
  And I take a screenshot "FeatureModifyPage" "SC2Step11"
  And I click view with selector ".gh-btn.gh-btn-black.gh-btn-large"
  And I wait for 3 seconds
  And I take a screenshot "FeatureModifyPage" "SC2Step12"
  And I click view with selector ".gh-btn.gh-btn-large.gh-btn-pulse.ember-view"
  And I wait for 5 seconds
  And I take a screenshot "FeatureModifyPage" "SC2Step13"
  Then I navigate to page "<URL_PAGE_TEST>"
  And I wait for 5 seconds
  And I take a screenshot "FeatureModifyPage" "SC2Step14"
  And I see the text of the page "Title"
  
@user3 @web
Scenario Outline: Modify Page title in Ghost with bad lenght
  Given I navigate to page "<URL>"
  And I take a screenshot "FeatureModifyPage" "SC3Step1"
  And I login "<USERNAME1>" "<PASSWORD1>"
  And I take a screenshot "FeatureModifyPage" "SC3Step2"
  When I navigate to page "<URL_PAGES>"
  And I wait for 4 seconds
  And I take a screenshot "FeatureModifyPage" "SC3Step3"
  And I click view with selector ".ember-view.gh-btn.gh-btn-primary.view-actions-top-row"
  And I wait for 2 seconds
  And I take a screenshot "FeatureModifyPage" "SC3Step4"
  And I click view with selector ".gh-editor-title.ember-text-area.gh-input.ember-view"
  And I enter text "Title"
  And I wait for 2 seconds
  And I take a screenshot "FeatureModifyPage" "SC3Step5"
  And I click view with selector ".koenig-editor__editor.__mobiledoc-editor.__has-no-content"
  And I enter text "Content"
  And I wait for 2 seconds
  And I take a screenshot "FeatureModifyPage" "SC3Step6"
  And I clic in back button
  And I wait for 2 seconds
  And I take a screenshot "FeatureModifyPage" "SC3Step7"
  And I click view with selector "li.gh-list-row.gh-posts-list-item a.gh-list-data.gh-post-list-title"
  And I wait for 2 seconds
  And I take a screenshot "FeatureModifyPage" "SC3Step8"
  And I click view with selector ".gh-editor-title.ember-text-area.gh-input.ember-view"
  And I clear title
  And I enter text "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  And I wait for 2 seconds
  And I take a screenshot "FeatureModifyPage" "SC3Step9"
  And I click view with selector ".gh-btn.gh-btn-editor.darkgrey.gh-publish-trigger"
  And I wait for 5 seconds
  And I take a screenshot "FeatureModifyPage" "SC3Step10"
  Then I confirm that the validation error "Validation failed: Title cannot be longer than 255 characters" is shown
  
@user4 @web
Scenario Outline: Modify Page to delete authors in Ghost
  Given I navigate to page "<URL>"
  And I take a screenshot "FeatureModifyPage" "SC4Step1"
  And I login "<USERNAME1>" "<PASSWORD1>"
  And I take a screenshot "FeatureModifyPage" "SC4Step2"
  When I navigate to page "<URL_PAGES>"
  And I wait for 4 seconds
  And I take a screenshot "FeatureModifyPage" "SC4Step3"
  And I click view with selector ".ember-view.gh-btn.gh-btn-primary.view-actions-top-row"
  And I wait for 2 seconds
  And I take a screenshot "FeatureModifyPage" "SC4Step4"
  And I click view with selector ".gh-editor-title.ember-text-area.gh-input.ember-view"
  And I enter text "Title"
  And I wait for 2 seconds
  And I take a screenshot "FeatureModifyPage" "SC4Step5"
  And I click view with selector ".koenig-editor__editor.__mobiledoc-editor.__has-no-content"
  And I enter text "Content"
  And I wait for 2 seconds
  And I take a screenshot "FeatureModifyPage" "SC4Step6"
  And I clic in back button
  And I wait for 2 seconds
  And I take a screenshot "FeatureModifyPage" "SC4Step7"
  And I click view with selector "li.gh-list-row.gh-posts-list-item a.gh-list-data.gh-post-list-title"
  And I wait for 2 seconds
  And I take a screenshot "FeatureModifyPage" "SC4Step8"
  And I click view with selector ".settings-menu-toggle.gh-btn.gh-btn-editor.gh-btn-icon.icon-only.gh-btn-action-icon"
  And I delete author tag
  And I wait for 1 seconds
  And I take a screenshot "FeatureModifyPage" "SC4Step9"
  Then I confirm that the error "At least one author is required" in Authors is shown