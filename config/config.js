/* Magic Mirror Config Sample
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information on how you can configure this file
 * See https://github.com/MichMich/MagicMirror#configuration
 *
 */

var config = {
	address: "0.0.0.0", // Address to listen on, can be:
	                      // - "localhost", "127.0.0.1", "::1" to listen on loopback interface
	                      // - another specific IPv4/6 to listen on a specific interface
	                      // - "0.0.0.0", "::" to listen on any interface
	                      // Default, when address config is left out or empty, is "localhost"
	port: 8080,
	ipWhitelist: [], // Set [] to allow all IP addresses
	                                                       // or add a specific IPv4 of 192.168.1.5 :
	                                                       // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
	                                                       // or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
	                                                       // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	useHttps: false, 		// Support HTTPS or not, default "false" will use HTTP
	httpsPrivateKey: "", 	// HTTPS private key path, only require when useHttps is true
	httpsCertificate: "", 	// HTTPS Certificate path, only require when useHttps is true

	language: "cs",
	timeFormat: 24,
	units: "metric",
	// serverOnly:  true/false/"local" ,
			     // local for armv6l processors, default
			     //   starts serveronly and then starts chrome browser
			     // false, default for all  NON-armv6l devices
			     // true, force serveronly mode, because you want to.. no UI on this device

	modules: [
        {
            module: "MMM-Dynamic-Modules",
        },
        {
            module: 'MMM-Remote-Control',
            // uncomment the following line to show the URL of the remote control on the mirror
            // , position: 'bottom_left'
            // you can hide this module afterwards from the remote control itself
            config: {
                customCommand: {},  // Optional, See "Using Custom Commands" below
                customMenu: "custom_menu.json", // Optional, See "Custom Menu Items" below
                showModuleApiMenu: true, // Optional, Enable the Module Controls menu
                apiKey: "",         // Optional, See API/README.md for details
            }
        },
        {
            module: 'MMM-Carousel',
            position: 'bottom_bar', // Required only for navigation controls
            config: {
                transitionInterval: 5000,
                ignoreModules: ['clock', 'alert','newsfeed','currentweather','MMM-iFrame','MMM-MQTT'],
                mode: 'slides',
                showPageIndicators: true,
                showPageControls: true,
                slides: {
                    main: ['calendar', 'weatherforecast'],
                    "Slide 2": ['calendar_monthly', 'weatherforecast']
                },
                keyBindings: {
                    enabled: true,
                    map: {
                        NextSlide: "ArrowRight",
                        PrevSlide: "ArrowLeft",
                        Slide0:    "Home"
                    },
                    mode: "DEFAULT"
                }
            }
        },
        {
                module: 'MMM-KeyBindings',
                config: {
                }
        },
		{
			module: "alert",
		},
		{
			module: "updatenotification",
			position: "top_bar"
		},
		{
			module: "clock",
			position: "top_left"
		},
		{
			module: "calendar",
			header: "Kalendář",
			position: "top_left",
			config: {
//				showEnd: false,
//				timeFormat: 'absolute',
				calendars: [
					{  
						symbol: "calendar-check",
						url: "https://calendar.google.com/calendar/ical/3lj2aj28k57a3pbgau358hbdu0%40group.calendar.google.com/private-a1a564d626fc00431f67f6930440d35b/basic.ics"
					}
				]
			}
		},
		{
			module: "currentweather",
			position: "top_right",
			config: {
				location: "Písek",
				locationID: "", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				appid: "f8c9937456bc87d2b81b0ef35f90b362"
			}
		},
		{
			module: "weatherforecast",
			position: "top_right",
			header: "Weather Forecast",
			config: {
				location: "Písek",
				locationID: "", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				appid: "f8c9937456bc87d2b81b0ef35f90b362",
				maxNumberOfDays: 7,
				colored: true,
                fade: false,
                fadePoint: 1,
                showRainAmount: true
			}
		},
        {
				module: 'calendar_monthly',
				position: 'top_left',
				config: {
						// The config property is optional
						// Without a config, a default month view is shown
						// Please see the 'Configuration Options' section for more information
				}
        },
		{
			module: "newsfeed",
			position: "top_bar",
			config: {
				feeds: [
					{
						title: "iRozhlas",
						url: "https://www.irozhlas.cz/rss/irozhlas"
					},
                                        {
						title: "Aktuálně",
						url: "https://www.aktualne.cz/mrss/"
					}

				],
				showSourceTitle: true,
				showPublishDate: true,
				broadcastNewsFeeds: true,
				broadcastNewsUpdates: true
			}
		},
        {
            module: 'MMM-iFrame',
            position: 'top_right',	// This can be any of the regions.
            config: {
                // See 'Configuration options' for more information.
                    url: ["https://portal.chmi.cz/files/portal/docs/meteo/rad/mobile/ra6_30min.gif"],  // as many URLs you want or you can just ["ENTER IN URL"] if single URL.
                    updateInterval: 0.5 * 60 * 1000, // rotate URLs every 30 seconds
                    width: "300", // width of iframe
                    height: "150", // height of iframe
                    frameWidth: "200" // width of embedded iframe, height is beeing calculated by aspect ratio of iframe
            }
        },
        {
	    module: 'internet-monitor',
            position: 'top_center',
            header: 'Internet Monitor',
            config:{
                type: '',
                maxTime: 20000,
                updateInterval: 0,
                verbose: false,
                displayStrength: true,
                displaySpeed: true,
                strengthIconSize: 80,
                maxGaugeScale: 100,
            },
        },
        {
            module: 'MMM-MQTT',
            position: 'top_right',
            header: 'Počasí',
            config: {
                logging: false,
                useWildcards: true,
                mqttServers: [
                    {
                        address: '10.10.10.20',  // Server address or IP address
                        port: '1883',          // Port number if other than default
                        user: '',          // Leave out for no user
                        password: '',  // Leave out for no password
                        subscriptions: [
                            {
                                topic: 'influx/weather/temp', // Topic to look for
                                label: 'Venku', // Displayed in front of value
                                suffix: '°C',         // Displayed after the value
                                lastupdate: true,
                                jsonkey1: '/meter',
                                jsonvalue1: 'temp',
                                jsonkey2: '/dev',
                                jsonvalue2: 'wemos-weather',
                                jsonpointer: '/value',
                                maxAgeSeconds: 900,
                            },
                            {
                                topic: 'influx/weather/temp', // Topic to look for
                                label: 'Uvnitř', // Displayed in front of value
                                suffix: '°C',         // Displayed after the value
                                lastupdate: true,
                                jsonkey1: '/meter',
                                jsonvalue1: 'temp',
                                jsonkey2: '/dev',
                                jsonvalue2: 'nodemcu-weather-station',
                                jsonpointer: '/value',
                                maxAgeSeconds: 900,
                            },
                            {
                                topic: 'influx/weather/temp', // Topic to look for
                                label: 'Vlhkost', // Displayed in front of value
                                suffix: '%',         // Displayed after the value
                                jsonkey1: '/meter',
                                jsonvalue1: 'hum',
                                jsonkey2: '/dev',
                                jsonvalue2: 'wemos-weather',
                                jsonpointer: '/value',
                                maxAgeSeconds: 900,
                            },
                            {
                                topic: 'influx/weather/temp', // Topic to look for
                                label: 'Tlak', // Displayed in front of value
                                suffix: 'Hpa',         // Displayed after the value
                                jsonkey1: '/meter',
                                jsonvalue1: 'press',
                                jsonkey2: '/dev',
                                jsonvalue2: 'wemos-weather',
                                decimals: 1,
                                divide: 100,
                                jsonpointer: '/value',
                                maxAgeSeconds: 900,
                            },
                            {
                                topic: 'influx/weather/temp', // Topic to look for
                                label: 'Vcc', // Displayed in front of value
                                suffix: 'V',         // Displayed after the value
                                jsonkey1: '/meter',
                                jsonvalue1: 'vcc',
                                jsonkey2: '/dev',
                                jsonvalue2: 'wemos-weather',
                                jsonpointer: '/value',
                                maxAgeSeconds: 900,
                            },
                            {
                                topic: 'influx/home/energy', // Topic to look for
                                label: 'Energy1', // Displayed in front of value
                                suffix: 'W ',
                                lastupdate: true,
                                jsonkey1: '/topic',
                                jsonvalue1: 'energy',
                                jsonkey2: '/meter',
                                jsonvalue2: 'electricity1-realtime',
                                jsonpointer: '/value',
                                maxAgeSeconds: 10,
                            },
                            {
                                topic: 'influx/home/energy', // Topic to look for
                                label: 'Energy2', // Displayed in front of value
                                suffix: 'W ',
                                lastupdate: true,
                                jsonkey1: '/topic',
                                jsonvalue1: 'energy',
                                jsonkey2: '/meter',
                                jsonvalue2: 'electricity2-realtime',
                                jsonpointer: '/value',
                                maxAgeSeconds: 10,
                            },
                            {
                                topic: 'influx/home/energy', // Topic to look for
                                label: 'Energy3', // Displayed in front of value
                                suffix: 'W ',
                                lastupdate: true,
                                jsonkey1: '/topic',
                                jsonvalue1: 'energy',
                                jsonkey2: '/meter',
                                jsonvalue2: 'electricity3-realtime',
                                jsonpointer: '/value',
                                maxAgeSeconds: 10,
                            },
                        ]
                    }
                ],
            }
        }
	]

};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
