//

/// Branding
pref("app.releaseNotesURL", "https://github.com/richiedollar/stremio-gecko/releases", locked);
pref("app.releaseNotesURL.prompt", "https://github.com/richiedollar/stremio-gecko/releases", locked);
pref("app.update.url.details", "https://github.com/richiedollar/stremio-gecko/releases", locked);
pref("app.update.url.manual", "https://github.com/richiedollar/stremio-gecko/releases", locked);
pref("app.vendorURL", "https://github.com/richiedollar/stremio-gecko", locked);

/// Configure uBlock Origin
pref("browser.stremio-gecko.uBO.assetsBootstrapLocation", "https://raw.githubusercontent.com/richiedollar/stremio-gecko/main/uBlock/assets.json");
pref("browser.stremio-gecko.uBO.autoCommentFilterTemplate", "{{url}}");
pref("browser.stremio-gecko.uBO.autoUpdateDelayAfterLaunch", "10");
pref("browser.stremio-gecko.uBO.disableWebAssembly", "true");
pref("browser.stremio-gecko.uBO.filterAuthorMode", "true");
pref("browser.stremio-gecko.uBO.uiPopupConfig", "+logger");
pref("browser.stremio-gecko.uBO.updateAssetBypassBrowserCache", "true");

/// Always open links in existing browser window
pref("browser.link.open_newwindow", 1);
pref("browser.link.open_newwindow.disabled_in_fullscreen", false);
pref("browser.link.open_newwindow.restriction", 1);
pref("browser.link.open_newwindow.override.external", 1);

/// Block permission prompts to access camera
pref("permissions.default.camera", 2);

/// Block permission prompts to access microphone
pref("permissions.default.microphone", 2);

/// Clear FPP global overrides
// We're hardening FPP internally with our own `RFPTargetsDefault.inc` file instead of setting them here, which makes it far easier for users to add their own overrides if desired (by using this preference).
pref("privacy.fingerprintingProtection.overrides", ""); // [DEFAULT]

/// Clear FPP granular overrides
// We don't need/use these
pref("privacy.fingerprintingProtection.granularOverrides", ''); // [DEFAULT]

/// Disable alerts for breached and vulnerable passwords
pref("signon.management.page.breach-alerts.enabled", false);
pref("signon.management.page.breachAlertUrl", "");
pref("signon.management.page.vulnerable-passwords.enabled", false);

/// Disable Android Debugging
pref("devtools.remote.adb.extensionID", "");
pref("devtools.remote.adb.extensionURL", "");

/// Disable back-up/export of bookmarks
pref("browser.bookmarks.autoExportHTML", false); // [DEFAULT]
pref("browser.bookmarks.c", 0);

/// Disable BackupService
// https://searchfox.org/mozilla-central/source/browser/components/backup/content/debug.html
pref("browser.backup.archive.enabled", false); // [DEFAULT]
pref("browser.backup.enabled", false);
pref("browser.backup.preferences.ui.enabled", false); // [DEFAULT]
pref("browser.backup.restore.enabled", false); // [DEFAULT]
pref("browser.backup.scheduled.enabled", false); // [DEFAULT]
pref("browser.backup.scheduled.user-disabled", true);

/// Disable the bookmarks toolbar
pref("browser.toolbars.bookmarks.visibility", "never");

/// Disable browsing history
pref("places.history.enabled", false);

/// Disable button to switch search engines
pref("browser.urlbar.searchModeSwitcher.featureGate", false); // [HIDDEN]

/// Disable Containers
// https://support.mozilla.org/kb/how-use-firefox-containers
pref("privacy.userContext.enabled", false);
pref("privacy.userContext.ui.enabled", false);

/// Disable Cookie Banner Reduction
pref("cookiebanners.bannerClicking.enabled", false);
pref("cookiebanners.cookieInjector.enabled", false);
pref("cookiebanners.service.mode", 0); // [DEFAULT]
pref("cookiebanners.service.mode.privateBrowsing", 0); // [DEFAULT]
pref("cookiebanners.service.enableGlobalRules", false);
pref("cookiebanners.service.enableGlobalRules.subFrames", false);
pref("cookiebanners.ui.desktop.enabled", false); // [DEFAULT]

/// Disable custom CSS
pref("toolkit.legacyUserProfileCustomizations.stylesheets", false); // [DEFAULT]

/// Disable dynamic rounding of content dimensions
pref("privacy.resistFingerprinting.letterboxing", false); // [DEFAULT]

/// Disable Firefox Home
pref("browser.newtab.preload", false);
pref("browser.newtabpage.activity-stream.discoverystream.config", '{"collapsible":true,"enabled":false}');
pref("browser.newtabpage.activity-stream.discoverystream.enabled", false);
pref("browser.newtabpage.activity-stream.discoverystream.endpoints", "");
pref("browser.newtabpage.activity-stream.discoverystream.merino-provider.enabled", false);
pref("browser.newtabpage.activity-stream.discoverystream.merino-provider.endpoint", "");
pref("browser.newtabpage.activity-stream.discoverystream.ohttp.configURL", "");
pref("browser.newtabpage.activity-stream.discoverystream.ohttp.relayURL", "");
pref("browser.newtabpage.activity-stream.feeds.aboutpreferences", false);
pref("browser.newtabpage.activity-stream.feeds.discoverystreamfeed", false);
pref("browser.newtabpage.activity-stream.feeds.listsfeed", false);
pref("browser.newtabpage.activity-stream.feeds.newtabinit", false);
pref("browser.newtabpage.activity-stream.feeds.places", false);
pref("browser.newtabpage.activity-stream.feeds.prefs", false);
pref("browser.newtabpage.activity-stream.feeds.recommendationprovider", false);
pref("browser.newtabpage.activity-stream.feeds.sections", false);
pref("browser.newtabpage.activity-stream.feeds.smartshortcutsfeed", false);
pref("browser.newtabpage.activity-stream.feeds.startupcacheinit", false);
pref("browser.newtabpage.activity-stream.feeds.system.topsites", false);
pref("browser.newtabpage.activity-stream.feeds.systemtick", false);
pref("browser.newtabpage.activity-stream.feeds.timerfeed", false);
pref("browser.newtabpage.activity-stream.feeds.topsites", false);
pref("browser.newtabpage.activity-stream.feeds.trendingsearchfeed", false);
pref("browser.newtabpage.activity-stream.feeds.weatherfeed", false);
pref("browser.newtabpage.activity-stream.newtabWallpapers.enabled", false);
pref("browser.newtabpage.activity-stream.showSearch", false);
pref("browser.newtabpage.activity-stream.system.showWeather", false);
pref("browser.newtabpage.activity-stream.widgets.focusTimer.enabled", false);
pref("browser.newtabpage.activity-stream.widgets.lists.enabled", false);
pref("browser.newtabpage.activity-stream.widgets.system.enabled", false); // [DEFAULT]
pref("browser.newtabpage.activity-stream.widgets.system.lists.enabled", false); // [DEFAULT]
pref("browser.newtabpage.disableNewTabAsAddon", true); // [HIDDEN]
pref("browser.newtabpage.enabled", false);
pref("browser.newtabpage.shouldInitialize", false); // [HIDDEN]
pref("browser.newtabpage.trainhopAddon.xpiBaseURL", "");
pref("browser.startup.homepage", "chrome://browser/content/blanktab.html");
pref("browser.startup.homepage.abouthome_cache.enabled", false);
pref("browser.tabs.remote.separatePrivilegedContentProcess", false);

/// Disable Firefox Screenshots
pref("screenshots.browser.component.enabled", false);

/// Disable Firefox Sync
pref("identity.fxaccounts.auth.uri", "");
pref("identity.fxaccounts.autoconfig.uri", ""); // [DEFAULT]
pref("identity.fxaccounts.enabled", false);
pref("identity.fxaccounts.remote.oauth.uri", "");
pref("identity.fxaccounts.remote.pairing.uri", "");
pref("identity.fxaccounts.remote.profile.uri", "");
pref("identity.fxaccounts.remote.root", "");
pref("identity.fxaccounts.toolbar.defaultVisible", false); // Hide toolbar icon
pref("identity.fxaccounts.toolbar.enabled", false);
pref("identity.sync.tokenserver.uri", "");
pref("webextensions.storage.sync.enabled", false); // [HIDDEN]
pref("webextensions.storage.sync.kinto", false); // [DEFAULT]
pref("webextensions.storage.sync.serverURL", "");

/// Disable Firefox Translations
pref("browser.translations.automaticallyPopup", false);
pref("browser.translations.enable", false);
pref("browser.translations.select.enable", false);
pref("browser.translations.simulateUnsupportedEngine", true);
pref("extensions.translations.disabled", true);

/// Disable geolocation
pref("geo.prompt.open_system_prefs", false); // Ensure users aren't prompted to open settings and enable Geolocation - https://searchfox.org/mozilla-central/rev/20fc11f1/modules/libpref/init/StaticPrefList.yaml#6406
pref("geo.provider.network.scan", false);
pref("geo.provider.network.url", "");
pref("geo.provider.use_corelocation", false); // [OSX-ONLY]
pref("geo.provider.use_geoclue", false); // [LINUX-ONLY]
pref("network.wifi.scanning_period", 0);
pref("widget.use-xdg-desktop-portal.location", 0); // [LINUX-ONLY]

/// Disable local keyword shortcuts
pref("browser.urlbar.searchRestrictKeywords.featureGate", false); // [HIDDEN]

/// Disable machine learning
pref("browser.ml.enable", false);
pref("browser.urlbar.quicksuggest.mlEnabled", false);
pref("extensions.ml.enabled", false);

/// Disable 'Migration' functionality
pref("browser.migrate.bookmarks-file.enabled", false);
pref("browser.migrate.brave.enabled", false);
pref("browser.migrate.canary.enabled", false);
pref("browser.migrate.chrome.enabled", false);
pref("browser.migrate.chrome.extensions.enabled", false);
pref("browser.migrate.chrome.get_permissions.enabled", false);
pref("browser.migrate.chrome.payment_methods.enabled", false);
pref("browser.migrate.chrome-beta.enabled", false);
pref("browser.migrate.chrome-dev.enabled", false);
pref("browser.migrate.chromium.enabled", false);
pref("browser.migrate.chromium-360se.enabled", false);
pref("browser.migrate.chromium-edge.enabled", false);
pref("browser.migrate.chromium-edge-beta.enabled", false);
pref("browser.migrate.content-modal.import-all.enabled", false);
pref("browser.migrate.edge.enabled", false);
pref("browser.migrate.firefox.enabled", false);
pref("browser.migrate.ie.enabled", false);
pref("browser.migrate.interactions.bookmarks", false);
pref("browser.migrate.interactions.csvpasswords", false);
pref("browser.migrate.interactions.history", false);
pref("browser.migrate.interactions.passwords", false);
pref("browser.migrate.opera.enabled", false);
pref("browser.migrate.opera-gx.enabled", false);
pref("browser.migrate.preferences-entrypoint.enabled", false);
pref("browser.migrate.safari.enabled", false);
pref("browser.migrate.vivaldi.enabled", false);
pref("extensions.getAddons.browserMappings.url", ""); 

/// Disable Narrator
pref("narrate.enabled", false);

/// Disable PDF.js
pref("browser.helperApps.showOpenOptionForPdfJS", false);

/// Disable printing
pref("print.enabled", false);
pref("print.show_page_setup_menu", false);

/// Disable profiles UI
pref("browser.profiles.enabled", false);

/// Disable Reader Mode
pref("reader.parse-on-load.enabled", false);

/// Disable session restore
pref("browser.sessionstore.max_resumed_crashes", 0);
pref("browser.sessionstore.max_tabs_undo", 0);
pref("browser.sessionstore.max_windows_undo", 0);
pref("browser.sessionstore.resume_from_crash", false);
pref("browser.sessionstore.restore_on_demand", false);
pref("browser.startup.couldRestoreSession.count", -1);

/// Disable Sidebar
pref("sidebar.revamp", false);

/// Disable support for web applications manifests
pref("dom.manifest.enabled", false);

/// Disable Tab Groups
pref("browser.tabs.groups.enabled", false);

/// Disable Taskbar Tabs (PWAs)
pref("browser.taskbarTabs.enabled", false);

/// Disable URL Bar suggestions
pref("browser.search.separatePrivateDefault.urlbarResult.enabled", false); // [DEFAULT]
pref("browser.urlbar.addons.featureGate", false); // [DEFAULT]
pref("browser.urlbar.clipboard.featureGate", false); // [DEFAULT]
pref("browser.urlbar.contextualSearch.enabled", false);
pref("browser.urlbar.flightStatus.featureGate", false);
pref("browser.urlbar.importantDates.featureGate", true);
pref("browser.urlbar.market.featureGate", false);
pref("browser.urlbar.maxHistoricalSearchSuggestions", 0);
pref("browser.urlbar.maxRichResults", 0);
pref("browser.urlbar.mdn.featureGate", false); // [DEFAULT]
pref("browser.urlbar.merino.endpointURL", "");
pref("browser.urlbar.merino.ohttpConfigURL", "");
pref("browser.urlbar.merino.ohttpRelayURL", "");
pref("browser.urlbar.merino.providers", "");
pref("browser.urlbar.quickactions.showPrefs", false); // [HIDDEN] [DEFAULT]
pref("browser.urlbar.recentsearches.featureGate", false);
pref("browser.urlbar.richSuggestions.featureGate", false);
pref("browser.urlbar.secondaryActions.featureGate", false); // [HIDDEN]
pref("browser.urlbar.suggest.calculator", false);
pref("browser.urlbar.suggest.importantDates", false);
pref("browser.urlbar.suggest.openpage", false);
pref("browser.urlbar.suggest.remotetab", false);
pref("browser.urlbar.trending.featureGate", false);
pref("browser.urlbar.unitConversion.enabled", false);
pref("browser.urlbar.weather.featureGate", false); // [DEFAULT]
pref("browser.urlbar.wikipedia.featureGate", false); // [DEFAULT]
pref("keyword.enabled", false);

/// Disable visual search
pref("browser.search.visualSearch.featureGate", false);

/// Disable WASM-Baseline JIT
pref("javascript.options.wasm_baselinejit", false);

/// Disable WASM for extensions
pref("javascript.options.wasm_trustedprincipals", false);

/// Disable WebGL
pref("webgl.disabled", true);

/// Disable WebRTC
pref("media.peerconnection.enabled", false);

/// Do not warn on quit
pref("browser.warnOnQuit", false);
pref("browser.warnOnQuitShortcut", false);

/// Enable `Compact` mode
pref("browser.uidensity", 1);

/// Enable the Phoenix add-on blocklist by default
// https://codeberg.org/celenity/Phoenix/src/branch/pages/build/policies/blocklist.json
pref("browser.stremio-gecko.extensions.blocklist.enabled", true); // [DEFAULT]

/// Hide Firefox Relay UI
pref("signon.firefoxRelay.feature", "not available");

/// Hide "Other Bookmarks"
pref("browser.toolbars.bookmarks.showOtherBookmarks", false);

/// Hide Password Manager/Autofill UI
pref("extensions.formautofill.addresses.supported", "off");
pref("extensions.formautofill.creditCards.supported", "off");
pref("security.webauthn.show_ms_settings_link", false);
pref("signon.generation.available", false);

/// Hide the search bar at `Customize toolbar...`
pref("browser.search.widget.inNavBar", false); // [HIDDEN] [DEFAULT]

/// Hide UI to add custom search engines at `about:preferences#search`
pref("browser.urlbar.update2.engineAliasRefresh", false);

/// Hide UI to switch search engines for individual searches
pref("browser.urlbar.scotchBonnet.disableOneOffs", true); // [HIDDEN]

/// Remove unnecessary URL Bar shortcuts
pref("browser.urlbar.shortcuts.bookmarks", false);
pref("browser.urlbar.shortcuts.history", false);
pref("browser.urlbar.shortcuts.tabs", false);

/// Restrict Remote Settings
pref("browser.stremio-gecko.services.settings.allowedCollections", "blocklists/addons,blocklists/addons-bloomfilters,blocklists/gfx,blocklists/plugins,main/addons-data-leak-blocker-domains,main/anti-tracking-url-decoration,main/bounce-tracking-protection-exceptions,main/hijack-blocklists,main/partitioning-exempt-urls,main/public-suffix-list,main/query-stripping,main/remote-permissions,main/third-party-cookie-blocking-exempt-urls,main/tracking-protection-lists,main/url-classifier-exceptions,main/url-classifier-skip-urls,main/url-parser-default-unknown-schemes-interventions,main/webcompat-interventions,security-state/cert-revocations,security-state/ct-logs,security-state/intermediates,security-state/onecrl");
pref("browser.stremio-gecko.services.settings.allowedCollectionsFromDump", "blocklists/addons,blocklists/addons-bloomfilters,blocklists/gfx,blocklists/plugins,main/addons-data-leak-blocker-domains,main/anti-tracking-url-decoration,main/bounce-tracking-protection-exceptions,main/hijack-blocklists,main/moz-essential-domain-fallbacks,main/partitioning-exempt-urls,main/public-suffix-list,main/query-stripping,main/remote-permissions,main/search-config-v2,main/third-party-cookie-blocking-exempt-urls,main/tracking-protection-lists,main/url-classifier-exceptions,main/url-classifier-skip-urls,main/url-parser-default-unknown-schemes-interventions,main/webcompat-interventions,security-state/cert-revocations,security-state/ct-logs,security-state/intermediates,security-state/onecrl");

/// Set external links to open in the default browser
pref("network.protocol-handler.expose.open", false);
pref("network.protocol-handler.external.open", true);
pref("network.protocol-handler.warn-external.open", true);

pref("browser.stremio-gecko.applied", true, locked);
