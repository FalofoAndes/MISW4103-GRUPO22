Feature: Modify Post
  As a user, I want to modify the post to keep them updated and in case I make mistakes, fix them
  

    @user1 @web
  Scenario Outline: Modify post by deleting the author
   Given I navigate to page "<URL>"
   And I take a screenshot "FeatureModifyPost" "SC1Step1"
   And I login "<USERNAME1>" "<PASSWORD1>"
   And I wait for 5 seconds
   And I take a screenshot "FeatureModifyPost" "SC1Step2"
   And I navigate to page "https://ghost-ur1e.onrender.com/ghost/#/editor/post/"
   And I wait for 2 seconds
   And I take a screenshot "FeatureModifyPost" "SC1Step3"
   And I click view with selector ".gh-editor-title.ember-text-area.gh-input.ember-view"
   And I enter text "Normal Title"
   And I wait for 2 seconds
   And I take a screenshot "FeatureModifyPost" "SC1Step4"
   And I click view with selector ".koenig-editor__editor.__mobiledoc-editor.__has-no-content"
   And I enter text "Content of post"
   And I wait for 2 seconds
   And I take a screenshot "FeatureModifyPost" "SC1Step5"
   And I clic in back button
   And I wait for 3 seconds
   And I take a screenshot "FeatureModifyPost" "SC1Step6"
   And I click view with selector "li.gh-list-row.gh-posts-list-item a.gh-list-data.gh-post-list-title"
   And I wait for 4 seconds
   And I take a screenshot "FeatureModifyPost" "SC1Step7"
   When I click view with selector ".settings-menu-toggle.gh-btn.gh-btn-editor.gh-btn-icon.icon-only.gh-btn-action-icon"
   And I wait for 2 seconds
   And I take a screenshot "FeatureModifyPost" "SC1Step8"
   And I delete author tag
   And I wait for 2 seconds
   And I take a screenshot "FeatureModifyPost" "SC1Step9"
   Then I see the error "At least one author is required."

    @user2 @web
  Scenario Outline: Modify post changed the title 
   Given I navigate to page "<URL>"
   And I take a screenshot "FeatureModifyPost" "SC2Step1"
   And I login "<USERNAME1>" "<PASSWORD1>"
   And I wait for 5 seconds
   And I take a screenshot "FeatureModifyPost" "SC2Step2"
   And I navigate to page "https://ghost-ur1e.onrender.com/ghost/#/editor/post/"
   And I wait for 2 seconds
   And I take a screenshot "FeatureModifyPost" "SC2Step3"
   And I click view with selector ".gh-editor-title.ember-text-area.gh-input.ember-view"
   And I enter text "Normal Title"
   And I wait for 2 seconds
   And I take a screenshot "FeatureModifyPost" "SC2Step4"
   And I click view with selector ".koenig-editor__editor.__mobiledoc-editor.__has-no-content"
   And I enter text "Content of post"
   And I wait for 2 seconds
   And I take a screenshot "FeatureModifyPost" "SC2Step5"
   And I clic in back button
   And I wait for 3 seconds
   And I take a screenshot "FeatureModifyPost" "SC2Step6"
   And I click view with selector "li.gh-list-row.gh-posts-list-item a.gh-list-data.gh-post-list-title"
   And I wait for 4 seconds
   And I take a screenshot "FeatureModifyPost" "SC2Step7"
   When I click view with selector ".gh-editor-title.ember-text-area.gh-input.ember-view"
   And I enter new title "New title"
   And I click view with selector ".koenig-editor__editor.__mobiledoc-editor"
   And I wait for 2 seconds
   And I take a screenshot "FeatureModifyPost" "SC2Step8"
   Then I confirm that the title page contains the post title "New title"

     @user3 @web
  Scenario Outline: Modify post changed the url
    Given I navigate to page "<URL>"
    And I take a screenshot "FeatureModifyPost" "SC3Step1"
    And I login "<USERNAME1>" "<PASSWORD1>"
    And I wait for 5 seconds
    And I take a screenshot "FeatureModifyPost" "SC3Step2"
    And I navigate to page "https://ghost-ur1e.onrender.com/ghost/#/editor/post/"
    And I wait for 2 seconds
    And I take a screenshot "FeatureModifyPost" "SC3Step3"
    And I click view with selector ".gh-editor-title.ember-text-area.gh-input.ember-view"
    And I enter text "Normal Title"
    And I wait for 2 seconds
    And I take a screenshot "FeatureModifyPost" "SC3Step4"
    And I click view with selector ".koenig-editor__editor.__mobiledoc-editor.__has-no-content"
    And I enter text "Content of post"
    And I wait for 2 seconds
    And I take a screenshot "FeatureModifyPost" "SC3Step5"
    And I clic in back button
    And I wait for 3 seconds
    And I take a screenshot "FeatureModifyPost" "SC3Step6"
    And I click view with selector "li.gh-list-row.gh-posts-list-item a.gh-list-data.gh-post-list-title"
    And I wait for 4 seconds
    And I take a screenshot "FeatureModifyPost" "SC3Step7"
    When I click view with selector ".settings-menu-toggle.gh-btn.gh-btn-editor.gh-btn-icon.icon-only.gh-btn-action-icon"
    And I wait for 2 seconds
    And I take a screenshot "FeatureModifyPost" "SC3Step8"
    And I enter new url "url-prueba"
    And I wait for 2 seconds
    And I take a screenshot "FeatureModifyPost" "SC3Step9"
    Then I see the text of url page change to "ghost-ur1e.onrender.com/url-prueba/"

  
     @user4 @web
   Scenario Outline: Modify post changed the title for title with more than 255 characteres
   Given I navigate to page "<URL>"
   And I take a screenshot "FeatureModifyPost" "SC4Step1"
   And I login "<USERNAME1>" "<PASSWORD1>"
   And I wait for 5 seconds
   And I take a screenshot "FeatureModifyPost" "SC4Step2"
   And I navigate to page "https://ghost-ur1e.onrender.com/ghost/#/editor/post/"
   And I wait for 2 seconds
   And I take a screenshot "FeatureModifyPost" "SC4Step3"
   And I click view with selector ".gh-editor-title.ember-text-area.gh-input.ember-view"
   And I enter text "Normal Title"
   And I wait for 2 seconds
   And I take a screenshot "FeatureModifyPost" "SC4Step4"
   And I click view with selector ".koenig-editor__editor.__mobiledoc-editor.__has-no-content"
   And I enter text "Content of post"
   And I wait for 2 seconds
   And I take a screenshot "FeatureModifyPost" "SC4Step5"
   And I clic in back button
   And I wait for 3 seconds
   And I take a screenshot "FeatureModifyPost" "SC4Step6"
   When I click view with selector "li.gh-list-row.gh-posts-list-item a.gh-list-data.gh-post-list-title"
   And I wait for 4 seconds
   And I take a screenshot "FeatureModifyPost" "SC4Step7"
   And I click view with selector ".gh-editor-title.ember-text-area.gh-input.ember-view"
   And I enter title longer
   And I click view with selector ".gh-btn.gh-btn-editor.darkgrey.gh-publish-trigger"
   And I wait for 3 seconds
   And I take a screenshot "FeatureModifyPost" "SC4Step8" 
   Then I see the error about longer title "Validation failed: Title cannot be longer than 255 characters."
 