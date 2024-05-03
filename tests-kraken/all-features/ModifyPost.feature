Feature: Modify Post
  As a user, I want to modify the post to keep them updated and in case I make mistakes, fix them
  

    @user1 @web
  Scenario Outline: Modify post by deleting the author
   Given I navigate to page "<URL>"
   And I login "<USERNAME1>" "<PASSWORD1>"
   And I wait for 5 seconds
   And I navigate to page "https://ghost-ur1e.onrender.com/ghost/#/editor/post/"
   And I wait for 2 seconds
   And I click view with selector ".gh-editor-title.ember-text-area.gh-input.ember-view"
   And I enter text "Normal Title"
   And I wait for 2 seconds
   And I click view with selector ".koenig-editor__editor.__mobiledoc-editor.__has-no-content"
   And I enter text "Content of post"
   And I wait for 2 seconds
   And I clic in back button
   And I wait for 3 seconds
   And I click view with selector "li.gh-list-row.gh-posts-list-item a.gh-list-data.gh-post-list-title"
   And I wait for 4 seconds
   When I click view with selector ".settings-menu-toggle.gh-btn.gh-btn-editor.gh-btn-icon.icon-only.gh-btn-action-icon"
   And I wait for 2 seconds
   And I click view with selector ".ember-power-select-multiple-remove-btn"
   And I wait for 2 seconds
   Then I see the error "At least one author is required."

    @user2 @web
  Scenario Outline: Modify post changed the title 
   Given I navigate to page "<URL>"
   And I login "<USERNAME1>" "<PASSWORD1>"
   And I wait for 5 seconds
   And I navigate to page "https://ghost-ur1e.onrender.com/ghost/#/editor/post/"
   And I wait for 2 seconds
   And I click view with selector ".gh-editor-title.ember-text-area.gh-input.ember-view"
   And I enter text "Normal Title"
   And I wait for 2 seconds
   And I click view with selector ".koenig-editor__editor.__mobiledoc-editor.__has-no-content"
   And I enter text "Content of post"
   And I wait for 2 seconds
   And I clic in back button
   And I wait for 3 seconds
   And I click view with selector "li.gh-list-row.gh-posts-list-item a.gh-list-data.gh-post-list-title"
   And I wait for 4 seconds
   When I click view with selector ".gh-editor-title.ember-text-area.gh-input.ember-view"
   And I enter new title "New title"
   And I click view with selector ".koenig-editor__editor.__mobiledoc-editor"
   And I wait for 2 seconds
   Then I confirm that the title page contains the post title "New title"

     @user3 @web
  Scenario Outline: Modify post changed the url
    Given I navigate to page "<URL>"
    And I login "<USERNAME1>" "<PASSWORD1>"
    And I wait for 5 seconds
    And I navigate to page "https://ghost-ur1e.onrender.com/ghost/#/editor/post/"
    And I wait for 2 seconds
    And I click view with selector ".gh-editor-title.ember-text-area.gh-input.ember-view"
    And I enter text "Normal Title"
    And I wait for 2 seconds
    And I click view with selector ".koenig-editor__editor.__mobiledoc-editor.__has-no-content"
    And I enter text "Content of post"
    And I wait for 2 seconds
    And I clic in back button
    And I wait for 3 seconds
    And I click view with selector "li.gh-list-row.gh-posts-list-item a.gh-list-data.gh-post-list-title"
    And I wait for 4 seconds
    When I click view with selector ".settings-menu-toggle.gh-btn.gh-btn-editor.gh-btn-icon.icon-only.gh-btn-action-icon"
    And I wait for 2 seconds
    And I enter new url "url-prueba"
    And I wait for 2 seconds
    And I click view with selector ".gh-btn.gh-btn-editor.darkgrey.gh-publish-trigger"
    And I wait for 2 seconds
    And I click view with selector ".gh-btn.gh-btn-black.gh-btn-large"
    And I wait for 2 seconds
    And I click view with selector ".gh-btn.gh-btn-large.gh-btn-pulse.ember-view"
    And I wait for 5 seconds
    Then I navigate to page "https://ghost-ur1e.onrender.com/url-prueba/"
    And I wait for 5 seconds
    And I see the text of the page "Normal Title"

  
     @user4 @web
   Scenario Outline: Modify post changed the title
   Given I navigate to page "<URL>"
   And I login "<USERNAME1>" "<PASSWORD1>"
   And I wait for 5 seconds
   And I navigate to page "https://ghost-ur1e.onrender.com/ghost/#/editor/post/"
   And I wait for 2 seconds
   And I click view with selector ".gh-editor-title.ember-text-area.gh-input.ember-view"
   And I enter text "Normal Title"
   And I wait for 2 seconds
   And I click view with selector ".koenig-editor__editor.__mobiledoc-editor.__has-no-content"
   And I enter text "Content of post"
   And I wait for 2 seconds
   And I clic in back button
   And I wait for 3 seconds
   When I click view with selector "li.gh-list-row.gh-posts-list-item a.gh-list-data.gh-post-list-title"
   And I wait for 4 seconds
   And I click view with selector ".gh-editor-title.ember-text-area.gh-input.ember-view"
   And I enter title longer
   And I click view with selector ".gh-btn.gh-btn-editor.darkgrey.gh-publish-trigger"
   And I wait for 3 seconds 
   Then I see the error about longer title "Validation failed: Title cannot be longer than 255 characters."
 


