Feature: Create Post in Ghost
  As an user I want to create post to share my opinion and knowledge in diferents topics 

@user1 @web

Scenario: Create Post in Ghost without title and with content
  
  Given I navigate to page "<URL>"
  And I take a screenshot "FeatureCreatePost" "SC1Step1"
  And I login "<USERNAME1>" "<PASSWORD1>"
  And I take a screenshot "FeatureCreatePost" "SC1Step2"
  When I navigate to page "https://ghost-ur1e.onrender.com/ghost/#/editor/post/"
  And I wait for 4 seconds
  And I take a screenshot "FeatureCreatePost" "SC1Step3"
  And I click view with selector ".koenig-editor__editor.__mobiledoc-editor.__has-no-content"
  And I wait for 2 seconds
  And I take a screenshot "FeatureCreatePost" "SC1Step4"
  And I enter text "Content of blog"
  And I wait for 2 seconds
  And I take a screenshot "FeatureCreatePost" "SC1Step5"
  Then I confirm that the title page contains the post title "(Untitled)"


@user2 @web

Scenario: Create Post and publish in Ghost with title longer than 255 characteres
 
  Given I navigate to page "<URL>"
  And I take a screenshot "FeatureCreatePost" "SC2Step1"
  And I login "<USERNAME1>" "<PASSWORD1>" 
  And I take a screenshot "FeatureCreatePost" "SC2Step2"
  When I navigate to page "https://ghost-ur1e.onrender.com/ghost/#/editor/post/"
  And I wait for 4 seconds
  And I take a screenshot "FeatureCreatePost" "SC2Step3"
  And I enter title longer
  And I wait for 2 seconds 
  And I take a screenshot "FeatureCreatePost" "SC2Step4"
  And I click view with selector ".koenig-editor__editor.__mobiledoc-editor.__has-no-content"
  And I wait for 5 seconds
  And I take a screenshot "FeatureCreatePost" "SC2Step5"
  Then I hope the publish button is not shown


@user3 @web

Scenario: Create Post in Ghost with normal title
  
  Given I navigate to page "<URL>"
  And I take a screenshot "FeatureCreatePost" "SC3Step1"
  And I login "<USERNAME1>" "<PASSWORD1>"
  And I take a screenshot "FeatureCreatePost" "SC3Step2"
  When I navigate to page "https://ghost-ur1e.onrender.com/ghost/#/editor/post/"
  And I wait for 4 seconds
  And I take a screenshot "FeatureCreatePost" "SC3Step3"
  And I click view with selector ".gh-editor-title.ember-text-area.gh-input.ember-view"
  And I enter text "Normal Title"
  And I take a screenshot "FeatureCreatePost" "SC3Step4"
  And I wait for 2 seconds
  And I take a screenshot "FeatureCreatePost" "SC3Step5"
  And I click view with selector ".koenig-editor__editor.__mobiledoc-editor.__has-no-content"
  And I wait for 2 seconds
  And I take a screenshot "FeatureCreatePost" "SC3Step6"
  And I clic in back button
  And I wait for 2 seconds
  And I take a screenshot "FeatureCreatePost" "SC3Step7"
  Then I see the first post in list with name Normal Title

  @user4 @web

Scenario: Create a post sucesfully and verify that the page title contains the post title
 
  Given I navigate to page "<URL>"
  And I take a screenshot "FeatureCreatePost" "SC4Step1"
  And I login "<USERNAME1>" "<PASSWORD1>"
  And I take a screenshot "FeatureCreatePost" "SC4Step2"
  When I navigate to page "https://ghost-ur1e.onrender.com/ghost/#/editor/post/"
  And I wait for 2 seconds
  And I take a screenshot "FeatureCreatePost" "SC4Step3"
  And I click view with selector ".gh-editor-title.ember-text-area.gh-input.ember-view"
  And I enter text "Normal Title"
  And I take a screenshot "FeatureCreatePost" "SC4Step4"
  And I wait for 2 seconds
  And I take a screenshot "FeatureCreatePost" "SC4Step5"
  And I click view with selector ".koenig-editor__editor.__mobiledoc-editor.__has-no-content"
  And I wait for 2 seconds
  And I take a screenshot "FeatureCreatePost" "SC4Step6"
  Then I confirm that the title page contains the post title "Normal Title"

@user5 @web

Scenario: Create post and publish with url specified 
    Given I navigate to page "<URL>"
    And I take a screenshot "FeatureCreatePost" "SC5Step1"
    And I login "<USERNAME1>" "<PASSWORD1>"
    And I take a screenshot "FeatureCreatePost" "SC5Step2"
    And I wait for 5 seconds
    And I take a screenshot "FeatureCreatePost" "SC5Step3"
    And I navigate to page "https://ghost-ur1e.onrender.com/ghost/#/editor/post/"
    And I wait for 2 seconds
    And I take a screenshot "FeatureCreatePost" "SC5Step4"
    When I click view with selector ".settings-menu-toggle.gh-btn.gh-btn-editor.gh-btn-icon.icon-only.gh-btn-action-icon"
    And I wait for 2 seconds
    And I take a screenshot "FeatureCreatePost" "SC5Step5"
    And I enter new url "url-new-post"
    And I wait for 2 seconds
    And I take a screenshot "FeatureCreatePost" "SC5Step6"
    Then I see the text of url page change to "ghost-ur1e.onrender.com/url-new-post/"

    
@user6 @web

Scenario: Create post and publish with tag specified

    Given I navigate to page "<URL>"
    And I take a screenshot "FeatureCreatePost" "SC6Step1"
    And I login "<USERNAME1>" "<PASSWORD1>"
    And I take a screenshot "FeatureCreatePost" "SC6Step2"
    And I wait for 5 seconds
    And I take a screenshot "FeatureCreatePost" "SC6Step3"
    And I navigate to page "https://ghost-ur1e.onrender.com/ghost/#/editor/post/"
    And I wait for 2 seconds
    And I take a screenshot "FeatureCreatePost" "SC6Step4"
    When I click view with selector ".settings-menu-toggle.gh-btn.gh-btn-editor.gh-btn-icon.icon-only.gh-btn-action-icon"
    And I wait for 2 seconds
    And I take a screenshot "FeatureCreatePost" "SC6Step5"
    And I click in select tag
    And I wait for 2 seconds
    And I take a screenshot "FeatureCreatePost" "SC6Step6"
    And I clic in the tag news
    And I wait for 2 seconds
    And I take a screenshot "FeatureCreatePost" "SC6Step7"
    Then I see the tag on the page "News"