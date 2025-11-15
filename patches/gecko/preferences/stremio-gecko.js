//

/// Branding
pref("app.releaseNotesURL", "https://github.com/richiedollar/stremio-gecko/releases", locked);
pref("app.releaseNotesURL.prompt", "https://github.com/richiedollar/stremio-gecko/releases", locked);
pref("app.update.url.details", "https://github.com/richiedollar/stremio-gecko/releases", locked);
pref("app.update.url.manual", "https://github.com/richiedollar/stremio-gecko/releases", locked);
pref("app.vendorURL", "https://github.com/richiedollar/stremio-gecko", locked);

/// Configure uBlock Origin
pref("browser.stremio-gecko.uBO.assetsBootstrapLocation", "https://gitlab.com/celenityy/stremio-gecko/-/raw/main/uBlock/assets.json");
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
pref("browser.tabs.loadBookmarksInTabs", false); // [DEFAULT]
pref("view_source.tab", false);

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

/// Disable add-on abuse reporting
pref("extensions.abuseReport.enabled", false);

/// Disable alerts for breached and vulnerable passwords
pref("browser.contentblocking.report.monitor.home_page_url", "");
pref("browser.contentblocking.report.monitor.how_it_works.url", "");
pref("browser.contentblocking.report.monitor.preferences_url", "");
pref("browser.contentblocking.report.monitor.sign_in_url", "");
pref("browser.contentblocking.report.monitor.url", "");
pref("signon.management.page.breach-alerts.enabled", false);
pref("signon.management.page.breachAlertUrl", "");
pref("signon.management.page.vulnerable-passwords.enabled", false);

/// Disable Android Debugging
pref("devtools.remote.adb.extensionID", "");
pref("devtools.remote.adb.extensionURL", "");

/// Disable back-up/export of bookmarks
pref("browser.bookmarks.autoExportHTML", false); // [DEFAULT]
pref("browser.bookmarks.max_backups", 0);

/// Disable background tasks
pref("dom.quotaManager.backgroundTask.enabled", false); // [DEFAULT]
pref("network.cache.shutdown_purge_in_background_task", false); // [DEFAULT]

/// Disable BackupService
// https://searchfox.org/mozilla-central/source/browser/components/backup/content/debug.html
pref("browser.backup.archive.enabled", false); // [DEFAULT]
pref("browser.backup.enabled", false);
pref("browser.backup.preferences.ui.enabled", false); // [DEFAULT]
pref("browser.backup.restore.enabled", false); // [DEFAULT]
pref("browser.backup.scheduled.enabled", false); // [DEFAULT]
pref("browser.backup.scheduled.user-disabled", true);

/// Disable bookmark edit dialog
pref("browser.bookmarks.editDialog.showForNewBookmarks", false);

/// Disable the bookmarks toolbar
pref("browser.bookmarks.defaultLocation", "menu");
pref("browser.toolbars.bookmarks.visibility", "never");

/// Disable browsing history
pref("places.history.enabled", false);

/// Disable button to switch search engines
pref("browser.urlbar.searchModeSwitcher.featureGate", false); // [HIDDEN]

/// Disable the "Close duplicate tabs" context menu item
pref("browser.tabs.context.close-duplicate.enabled", false);

/// Disable Containers
// https://support.mozilla.org/kb/how-use-firefox-containers
pref("privacy.userContext.enabled", false);
pref("privacy.userContext.ui.enabled", false);

/// Disable Cookie Banner Reduction
pref("cookiebanners.bannerClicking.enabled", false);
pref("cookiebanners.cookieInjector.enabled", false);
pref("cookiebanners.listService.testSkipRemoteSettings", true);
pref("cookiebanners.service.mode", 0); // [DEFAULT]
pref("cookiebanners.service.mode.privateBrowsing", 0); // [DEFAULT]
pref("cookiebanners.service.enableGlobalRules", false);
pref("cookiebanners.service.enableGlobalRules.subFrames", false);
pref("cookiebanners.ui.desktop.enabled", false); // [DEFAULT]

/// Disable custom CSS
pref("toolkit.legacyUserProfileCustomizations.stylesheets", false); // [DEFAULT]

/// Disable dictionaries
pref("browser.dictionaries.download.url", "");

/// Disable DRM/EME
pref("media.eme.encrypted-media-encryption-scheme.enabled", false);
pref("media.eme.hdcp-policy-check.enabled", false);
pref("media.gmp-widevinecdm.visible", false);
pref("media.gmp-widevinecdm-l1.visible", false); // [DEFAULT - non-Nightly]

/// Disable dynamic rounding of content dimensions
pref("privacy.resistFingerprinting.letterboxing", false); // [DEFAULT]

/// Disable favicons
pref("browser.chrome.guess_favicon", false); // [HIDDEN]
pref("browser.chrome.site_icons", false);

/// Disable the fire button in Private Browsing Windows
pref("browser.privatebrowsing.resetPBM.enabled", false);

/// Disable the "Forget" button
pref("privacy.panicButton.enabled", false);

/// Disable Firefox Bridge
pref("browser.firefoxbridge.extensionOrigins", "");

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
pref("browser.newtabpage.activity-stream.widgets.system.focusTimer.enabled", false); // [DEFAULT]
pref("browser.newtabpage.activity-stream.widgets.system.lists.enabled", false); // [DEFAULT]
pref("browser.newtabpage.disableNewTabAsAddon", true); // [HIDDEN]
pref("browser.newtabpage.enabled", false);
pref("browser.newtabpage.shouldInitialize", false); // [HIDDEN]
pref("browser.newtabpage.trainhopAddon.xpiBaseURL", "");
pref("browser.startup.firstrunSkipsHomepage", false);
pref("browser.startup.homepage", "chrome://browser/content/blanktab.html");
pref("browser.startup.homepage.abouthome_cache.enabled", false);
pref("browser.tabs.remote.separatePrivilegedContentProcess", false);

/// Disable Firefox Relay
pref("signon.firefoxRelay.base_url", "");
pref("signon.firefoxRelay.denyListRemoteSettingsCollection", "");
pref("signon.firefoxRelay.feature", "not available");
pref("signon.firefoxRelay.learn_more_url", "");
pref("signon.firefoxRelay.manage_url", "");
pref("signon.firefoxRelay.privacy_policy_url", "");
pref("signon.firefoxRelay.terms_of_service_url", "");

/// Disable Firefox Screenshots
pref("screenshots.browser.component.enabled", false);

/// Disable Firefox Sync
pref("identity.fxaccounts.auth.uri", "");
pref("identity.fxaccounts.autoconfig.uri", ""); // [DEFAULT]
pref("identity.fxaccounts.commands.remoteTabManagement.enabled", false);
pref("identity.fxaccounts.enabled", false);
pref("identity.fxaccounts.oauth.enabled", false);
pref("identity.fxaccounts.pairing.enabled", false);
pref("identity.fxaccounts.remote.oauth.uri", "");
pref("identity.fxaccounts.remote.pairing.uri", "");
pref("identity.fxaccounts.remote.profile.uri", "");
pref("identity.fxaccounts.remote.root", "");
pref("identity.fxaccounts.toolbar.defaultVisible", false); // Hide toolbar icon
pref("identity.fxaccounts.toolbar.enabled", false);
pref("identity.sync.tokenserver.uri", "");
pref("services.sync.engine.addresses.available", false); // [DEFAULT]
pref("services.sync.engine.creditcards.available", false);
pref("webextensions.storage.sync.enabled", false); // [HIDDEN]
pref("webextensions.storage.sync.kinto", false); // [DEFAULT]
pref("webextensions.storage.sync.serverURL", "");

/// Disable Firefox Translations
pref("browser.translations.automaticallyPopup", false);
pref("browser.translations.enable", false);
pref("browser.translations.select.enable", false);
pref("browser.translations.simulateUnsupportedEngine", true);
pref("extensions.translations.disabled", true);

/// Disable Firefox View
pref("browser.firefox-view.virtual-list.enabled", false);

/// Disable geolocation
pref("geo.prompt.open_system_prefs", false); // Ensure users aren't prompted to open settings and enable Geolocation - https://searchfox.org/mozilla-central/rev/20fc11f1/modules/libpref/init/StaticPrefList.yaml#6406
pref("geo.provider.network.scan", false);
pref("geo.provider.network.url", "");
pref("geo.provider.use_corelocation", false); // [OSX-ONLY]
pref("geo.provider.use_geoclue", false); // [LINUX-ONLY]
pref("network.wifi.scanning_period", 0);
pref("widget.use-xdg-desktop-portal.location", 0); // [LINUX-ONLY]

/// Disable inspector
pref("devtools.inspector.enabled", false);

/// Disable local keyword shortcuts
pref("browser.urlbar.searchRestrictKeywords.featureGate", false); // [HIDDEN]

/// Disable the macOS WebAuthn Platform API
pref("security.webauthn.enable_macos_passkeys", false);

/// Disable machine learning
pref("browser.ml.chat.provider", "");
pref("browser.ml.chat.sidebar", false);
pref("browser.ml.enable", false);
pref("browser.ml.modelHubRootUrl", "");
pref("browser.urlbar.quicksuggest.mlEnabled", false);
pref("dom.ipc.processCount.inference", 0);
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
pref("signon.showAutoCompleteImport", "");
pref("signon.suggestImportCount", 0);

/// Disable Narrator
pref("narrate.enabled", false);

/// Disable notification if default search engine is removed
pref("browser.search.removeEngineInfobar.enabled", false);

/// Disable Password Manager/Autofill
pref("browser.contentblocking.report.lockwise.how_it_works.url", "");
pref("browser.contextual-password-manager.enabled", false);
pref("extensions.formautofill.addresses.supported", "off");
pref("extensions.formautofill.addresses.supportedCountries", "");
pref("extensions.formautofill.creditCards.supported", "off");
pref("extensions.formautofill.creditCards.supportedCountries", "");
pref("security.webauthn.show_ms_settings_link", false);
pref("signon.backup.enabled", false);
pref("signon.capture.inputChanges.enabled", false);
pref("signon.formRemovalCapture.enabled", false);
pref("signon.generation.available", false);
pref("signon.generation.enabled", false);
pref("signon.passwordEditCapture.enabled", false);
pref("signon.recipes.path", "");
pref("signon.relatedRealms.enabled", false); // [DEFAULT]
pref("signon.showAutoCompleteFooter", false);
pref("signon.storeSignons", false); // [HIDDEN]
pref("signon.usernameOnlyForm.enabled", false);

/// Disable PDF.js
pref("browser.helperApps.showOpenOptionForPdfJS", false);

/// Disable printing
pref("print.enabled", false);
pref("print.show_page_setup_menu", false);

/// Disable profiles UI
pref("browser.profiles.enabled", false);

/// Disable Reader Mode
pref("reader.parse-on-load.enabled", false);

/// Disable restricted/quarantined Domains
// https://support.mozilla.org/kb/quarantined-domains
pref("extensions.quarantinedDomains.enabled", false);
pref("extensions.quarantinedDomains.list", "");
pref("extensions.quarantinedDomains.uiDisabled", true); // [HIDDEN]

/// Disable session restore
pref("browser.sessionhistory.max_entries", 0);
pref("browser.sessionstore.max_resumed_crashes", 0);
pref("browser.sessionstore.max_serialize_back", 0);
pref("browser.sessionstore.max_serialize_forward", 0);
pref("browser.sessionstore.max_tabs_undo", 0);
pref("browser.sessionstore.max_windows_undo", 0);
pref("browser.sessionstore.resume_from_crash", false);
pref("browser.sessionstore.resume_session_once", false); // [DEFAULT]
pref("browser.sessionstore.resuming_after_os_restart", false); // [DEFAULT]
pref("browser.sessionstore.restore_on_demand", false);
pref("browser.sessionstore.persist_closed_tabs_between_sessions", false);
pref("browser.sessionstore.upgradeBackup.maxUpgradeBackups", 0);
pref("browser.startup.couldRestoreSession.count", -1);

/// Disable the "Share URL" menu item
pref("browser.menu.share_url.allow", false); // [HIDDEN]

/// Disable Sidebar
pref("sidebar.main.tools", "");
pref("sidebar.revamp", false);

/// Disable support for web applications manifests
pref("dom.manifest.enabled", false);

/// Disable tab detach
pref("browser.tabs.allowTabDetach", false);

/// Disable Tab Groups
pref("browser.tabs.groups.enabled", false);

/// Disable tab "split view"
pref("browser.tabs.splitView.enabled", false); // [DEFAULT]

/// Disable tab switching with Ctrl+Tab
pref("browser.ctrlTab.disallowForScreenReaders", true); // [HIDDEN]

/// Disable Taskbar Tabs (PWAs)
pref("browser.taskbarTabs.enabled", false);

/// Disable text fragments
pref("dom.text_fragments.create_text_fragment.enabled", false);
pref("dom.text_fragments.enabled", false);

/// Disable toolbar keyboard navigation
pref("browser.toolbars.keyboard_navigation", false);

/// Disable the "Unload Tab" context menu item
pref("browser.tabs.unloadTabInContextMenu", false);

/// Disable the Updater
pref("app.update.auto", false, locked);
pref("app.update.background.enabled", false, locked); // [HIDDEN]
pref("app.update.BITS.enabled", false, locked);
pref("app.update.disabledForTesting", true, locked); // [HIDDEN]
pref("app.update.service.enabled", false, locked);
pref("app.update.staging.enabled", false, locked);

/// Disable URL fix-up
pref("browser.fixup.alternate.prefix", "");
pref("browser.fixup.alternate.protocol", "");
pref("browser.fixup.alternate.suffix", "");
pref("browser.urlbar.ctrlCanonizesURLs", false);

/// Disable UI for using a different search engine in normal vs. private Windows
pref("browser.search.separatePrivateDefault.ui.enabled", false);

/// Disable URL Bar suggestions
pref("browser.search.separatePrivateDefault.urlbarResult.enabled", false); // [DEFAULT]
pref("browser.urlbar.accessibility.tabToSearch.announceResults", false);
pref("browser.urlbar.addons.featureGate", false);
pref("browser.urlbar.clipboard.featureGate", false);
pref("browser.urlbar.closeOtherPanelsOnOpen", false); // [HIDDEN]
pref("browser.urlbar.contextualSearch.enabled", false);
pref("browser.urlbar.flightStatus.featureGate", false);
pref("browser.urlbar.importantDates.featureGate", false);
pref("browser.urlbar.market.featureGate", false);
pref("browser.urlbar.maxHistoricalSearchSuggestions", 0);
pref("browser.urlbar.maxRichResults", 0);
pref("browser.urlbar.mdn.featureGate", false);
pref("browser.urlbar.merino.endpointURL", "");
pref("browser.urlbar.merino.ohttpConfigURL", "");
pref("browser.urlbar.merino.ohttpRelayURL", "");
pref("browser.urlbar.merino.providers", "");
pref("browser.urlbar.quickactions.enabled", false); // [HIDDEN]
pref("browser.urlbar.quickactions.showPrefs", false); // [HIDDEN] [DEFAULT]
pref("browser.urlbar.recentsearches.featureGate", false);
pref("browser.urlbar.resultMenu.keyboardAccessible", false);
pref("browser.urlbar.richSuggestions.featureGate", false);
pref("browser.urlbar.richSuggestions.tail", false);
pref("browser.urlbar.rustIngestIntervalSeconds", -1); // [HIDDEN]
pref("browser.urlbar.scotchBonnet.enableOverride", false);
pref("browser.urlbar.secondaryActions.featureGate", false); // [HIDDEN]
pref("browser.urlbar.sports.featureGate", false); // [NIGHTLY]
pref("browser.urlbar.suggest.bookmark", false);
pref("browser.urlbar.suggest.calculator", false);
pref("browser.urlbar.suggest.importantDates", false);
pref("browser.urlbar.suggest.openpage", false);
pref("browser.urlbar.suggest.remotetab", false);
pref("browser.urlbar.suggest.sports", false); // [NIGHTLY]
pref("browser.urlbar.suggest.topsites", false);
pref("browser.urlbar.trending.featureGate", false);
pref("browser.urlbar.unitConversion.enabled", false);
pref("browser.urlbar.weather.featureGate", false); // [DEFAULT]
pref("browser.urlbar.wikipedia.featureGate", false); // [DEFAULT]
pref("keyword.enabled", false);

/// Disable vertical tabs
pref("sidebar.verticalTabs", false); // [DEFAULT]

/// Disable visual search
pref("browser.search.visualSearch.featureGate", false);

/// Disable WebAssembly for extensions
pref("javascript.options.wasm_trustedprincipals", false);

/// Disable WebGL
pref("webgl.disabled", true);

/// Disable WebRTC
pref("media.peerconnection.enabled", false);

/// Do not display separate tabs
pref("browser.tabs.tabMinWidth", 2000);

/// Do not try to open the download panel
pref("browser.download.alwaysOpenPanel", false);

/// Do not try to open internally-handled attachments
pref("browser.download.force_save_internally_handled_attachments", true);
pref("browser.download.viewableInternally.enabledTypes", "");
pref("browser.helperApps.showOpenOptionForViewableInternally", false);

/// Do not try to unload tabs on low memory
pref("browser.tabs.unloadOnLowMemory", false); // [DEFAULT - non-macOS/Windows]

/// Do not warn on closing tabs
pref("browser.tabs.warnOnClose", false); // [DEFAULT]
pref("browser.tabs.warnOnCloseOtherTabs", false);

/// Do not warn on quit
pref("browser.warnOnQuit", false);
pref("browser.warnOnQuitShortcut", false);

/// Enable `Compact` mode
pref("browser.uidensity", 1);

/// Enable the Phoenix add-on blocklist by default
// https://codeberg.org/celenity/Phoenix/src/branch/pages/build/policies/blocklist.json
pref("browser.stremio-gecko.extensions.blocklist.enabled", true); // [DEFAULT]

/// Hide "Mobile Bookmarks"
pref("browser.toolbars.bookmarks.showMobileBookmarks", false); // [HIDDEN]

/// Hide "Other Bookmarks"
pref("browser.toolbars.bookmarks.showOtherBookmarks", false);

/// Hide tab "x" button
pref("browser.tabs.tabClipWidth", 999999999);

/// Hide the search bar at `Customize toolbar...`
pref("browser.search.widget.inNavBar", false); // [HIDDEN] [DEFAULT]
pref("browser.search.widget.new", false); // [DEFAULT]

/// Hide UI to add custom search engines at `about:preferences#search`
pref("browser.urlbar.update2.engineAliasRefresh", false);

/// Hide UI to automatically delete files downloaded in Private Browsing
pref("browser.download.enableDeletePrivate", false);

/// Hide UI to switch search engines for individual searches
pref("browser.urlbar.scotchBonnet.disableOneOffs", true); // [HIDDEN]

/// Re-enable WebAssembly
pref("javascript.options.wasm", true); // [DEFAULT]

/// Remove default Search Engine Placeholders
pref("browser.newtabpage.activity-stream.trendingSearch.defaultSearchEngine", ""); // [HIDDEN] [DEFAULT] [NIGHTLY]
pref("browser.urlbar.placeholderName", "");
pref("browser.urlbar.placeholderName.private", "");

/// Remove link to download themes
pref("lightweightThemes.getMoreURL", "");

/// Remove placeholder shortcut
pref("browser.newtabpage.pinned", ""); // [DEFAULT]

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

/// UI
pref("browser.uiCustomization.autoAdd", false); // [HIDDEN]
pref("browser.uiCustomization.state", '{"placements":{"widget-overflow-fixed-list":[],"unified-extensions-area":["ublock0_raymondhill_net-browser-action"],"nav-bar":["vertical-spacer","customizableui-special-spring22","customizableui-special-spring25","customizableui-special-spring26","customizableui-special-spring28","customizableui-special-spring30","customizableui-special-spring32","customizableui-special-spring34","customizableui-special-spring36","customizableui-special-spring17","customizableui-special-spring38","customizableui-special-spring40","customizableui-special-spring42","customizableui-special-spring44","customizableui-special-spring47","customizableui-special-spring21","customizableui-special-spring48","customizableui-special-spring50","customizableui-special-spring52","customizableui-special-spring55","customizableui-special-spring56","customizableui-special-spring59","customizableui-special-spring15","customizableui-special-spring61","customizableui-special-spring62","customizableui-special-spring16","customizableui-special-spring63","customizableui-special-spring64","customizableui-special-spring65","customizableui-special-spring70","customizableui-special-spring73","customizableui-special-spring75","customizableui-special-spring76","customizableui-special-spring78","customizableui-special-spring79","customizableui-special-spring80","customizableui-special-spring81","customizableui-special-spring82","customizableui-special-spring83","customizableui-special-spring84","customizableui-special-spring85","customizableui-special-spring86","customizableui-special-spring87","customizableui-special-spring88","customizableui-special-spring89","customizableui-special-spring90","customizableui-special-spring124","customizableui-special-spring102","customizableui-special-spring103","customizableui-special-spring105","customizableui-special-spring108","customizableui-special-spring125","customizableui-special-spring122","customizableui-special-spring126","customizableui-special-spring123","customizableui-special-spring127","customizableui-special-spring110","customizableui-special-spring131","customizableui-special-spring121","customizableui-special-spring116","customizableui-special-spring129","customizableui-special-spring130","customizableui-special-spring128","customizableui-special-spring119","customizableui-special-spring120","_testpilot-containers-browser-action","customizableui-special-spring136","customizableui-special-spring135","customizableui-special-spring134","customizableui-special-spring133","customizableui-special-spring117","customizableui-special-spring111","customizableui-special-spring54","customizableui-special-spring115","customizableui-special-spring118","customizableui-special-spring98","customizableui-special-spring93","customizableui-special-spring53","customizableui-special-spring51","customizableui-special-spring95","customizableui-special-spring57","customizableui-special-spring77","customizableui-special-spring46","customizableui-special-spring91","customizableui-special-spring74","customizableui-special-spring92","customizableui-special-spring71","customizableui-special-spring49","customizableui-special-spring69","customizableui-special-spring68","customizableui-special-spring67","customizableui-special-spring66","customizableui-special-spring58","customizableui-special-spring141","customizableui-special-spring142","customizableui-special-spring143","customizableui-special-spring193","customizableui-special-spring192","customizableui-special-spring144","customizableui-special-spring191","customizableui-special-spring146","customizableui-special-spring190","customizableui-special-spring148","customizableui-special-spring145","customizableui-special-spring189","customizableui-special-spring150","customizableui-special-spring147","customizableui-special-spring149","customizableui-special-spring151","customizableui-special-spring153","customizableui-special-spring156","customizableui-special-spring154","customizableui-special-spring155","customizableui-special-spring157","customizableui-special-spring159","customizableui-special-spring158","customizableui-special-spring188","customizableui-special-spring160","customizableui-special-spring162","customizableui-special-spring161","customizableui-special-spring163","customizableui-special-spring165","customizableui-special-spring166","customizableui-special-spring164","customizableui-special-spring187","customizableui-special-spring167","customizableui-special-spring168","customizableui-special-spring169","customizableui-special-spring170","customizableui-special-spring172","customizableui-special-spring173","customizableui-special-spring174","customizableui-special-spring175","customizableui-special-spring176","customizableui-special-spring177","customizableui-special-spring178","customizableui-special-spring179","customizableui-special-spring181","customizableui-special-spring182","customizableui-special-spring180","customizableui-special-spring184","customizableui-special-spring186","customizableui-special-spring185","back-button","urlbar-container","forward-button","customizableui-special-spring45","customizableui-special-spring43","customizableui-special-spring41","customizableui-special-spring39","customizableui-special-spring37","customizableui-special-spring35","customizableui-special-spring33","customizableui-special-spring31","customizableui-special-spring29","customizableui-special-spring27","customizableui-special-spring24","customizableui-special-spring23","customizableui-special-spring20","customizableui-special-spring19","customizableui-special-spring18","customizableui-special-spring14"],"TabsToolbar":["tabbrowser-tabs"],"vertical-tabs":[],"PersonalToolbar":["personal-bookmarks"],"toolbar-menubar":["menubar-items"]},"seen":["ublock0_raymondhill_net-browser-action"],"dirtyAreaCache":["nav-bar","vertical-tabs","PersonalToolbar","unified-extensions-area","TabsToolbar","toolbar-menubar"],"currentVersion":23,"newElementCount":193}');

pref("browser.stremio-gecko.applied", true, locked);
