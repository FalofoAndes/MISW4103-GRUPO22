const { After, Before } = require('@cucumber/cucumber');
const { WebClient } = require('kraken-node');

Before(async function() {
  this.deviceClient = new WebClient('edge', {}, {"userId":this.userId, "headless":true} );
  this.driver = await this.deviceClient.startKrakenForUserId(this.userId);
})

After(async function() {
  await this.deviceClient.stopKrakenForUserId(this.userId);
});
