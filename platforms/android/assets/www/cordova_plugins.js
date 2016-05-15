cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.apptentive.cordova/www/ApptentiveAndroid.js",
        "id": "com.apptentive.cordova.Apptentive",
        "clobbers": [
            "Apptentive"
        ]
    },
    {
        "file": "plugins/cordova-fabric-plugin/www/FabricPlugin.js",
        "id": "cordova-fabric-plugin.FabricPlugin",
        "clobbers": [
            "window.fabric.core"
        ]
    },
    {
        "file": "plugins/cordova-fabric-plugin/www/FabricPlugin.Answers.js",
        "id": "cordova-fabric-plugin.FabricAnswersPlugin",
        "clobbers": [
            "window.fabric.Answers"
        ]
    },
    {
        "file": "plugins/cordova-fabric-plugin/www/FabricPlugin.Crashlytics.js",
        "id": "cordova-fabric-plugin.FabricCrashlyticsPlugin",
        "clobbers": [
            "window.fabric.Crashlytics"
        ]
    },
    {
        "file": "plugins/cordova-plugin-datepicker/www/android/DatePicker.js",
        "id": "cordova-plugin-datepicker.DatePicker",
        "clobbers": [
            "datePicker"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device/www/device.js",
        "id": "cordova-plugin-device.device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/cordova-plugin-dialogs/www/notification.js",
        "id": "cordova-plugin-dialogs.notification",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "file": "plugins/cordova-plugin-dialogs/www/android/notification.js",
        "id": "cordova-plugin-dialogs.notification_android",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "file": "plugins/cordova-plugin-facebook4/www/facebook-native.js",
        "id": "cordova-plugin-facebook4.FacebookConnectPlugin",
        "clobbers": [
            "facebookConnectPlugin"
        ]
    },
    {
        "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
        "id": "cordova-plugin-splashscreen.SplashScreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
        "id": "cordova-plugin-statusbar.statusbar",
        "clobbers": [
            "window.StatusBar"
        ]
    },
    {
        "file": "plugins/cordova-plugin-whitelist/whitelist.js",
        "id": "cordova-plugin-whitelist.whitelist",
        "runs": true
    },
    {
        "file": "plugins/cordova-sqlite-storage/www/SQLitePlugin.js",
        "id": "cordova-sqlite-storage.SQLitePlugin",
        "clobbers": [
            "SQLitePlugin"
        ]
    },
    {
        "file": "plugins/ionic-plugin-keyboard/www/android/keyboard.js",
        "id": "ionic-plugin-keyboard.keyboard",
        "clobbers": [
            "cordova.plugins.Keyboard"
        ],
        "runs": true
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.apptentive.cordova": "3.0.0",
    "cordova-fabric-plugin": "1.0.7",
    "cordova-plugin-console": "1.0.2",
    "cordova-plugin-datepicker": "0.9.3",
    "cordova-plugin-device": "1.1.1",
    "cordova-plugin-dialogs": "1.2.1",
    "cordova-plugin-facebook4": "1.7.0",
    "cordova-plugin-splashscreen": "3.1.0",
    "cordova-plugin-statusbar": "2.1.2",
    "cordova-plugin-whitelist": "1.2.1",
    "cordova-sqlite-storage": "0.7.14",
    "ionic-plugin-keyboard": "2.0.1"
};
// BOTTOM OF METADATA
});