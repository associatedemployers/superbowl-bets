import Ember from "ember";
import config from "./config/environment";

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route("bet");

  this.route("success", {
    path: "/bet/success"
  });

  this.route("view-bets");
});

export default Router;