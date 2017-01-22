[Commands]
#Add InAppBrowser to import scope
npm install -g typings
typings install dt~cordova --save --global

#Before launching ionic platform add ios, i edited the plugin.xml file in the facebook plugin folder :
preferences name="APP_ID"
preferences name="APP_NAME"
to:
params name="APP_ID" value="facebook-app-id"
params name="APP_NAME" value="facebook-app-name"
Now i can run ios again.

#Ionic Package reads cordovaPlugins and cordovaPlatforms from your package.json file in order to 
install the correct plugins and platform needed to build your app. You can tweak your local plugin 
and platform versions locally and then execute ionic state save to update your package.json.
  

