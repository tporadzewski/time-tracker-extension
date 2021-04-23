## Timer Tracker (Browser) Extension

1. Clone or download an archive of this repository
2. Navigate in your browser to `chrome://extensions`
3. Make sure that Developer mode is active, using the toggle switch in the top-right
4. Click the **Load Unpacked** button toward the top-left, selecting the `dist` directory in this repo

Once installed, click the extenstion button to start the timer!

### TODO

- use `shadowMode` when the implementation for vue 3 is ready and get rid of styling by `::part`.
- prevent injecting script multiple times on toggling extension button.
- move detection if extension is active to `background.js`
