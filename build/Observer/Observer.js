"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterSubscriber = void 0;
var NewsletterSubscriber = /** @class */ (function () {
    function NewsletterSubscriber(name, currentSubNames) {
        var _this = this;
        this.name = name;
        this.currentSubNames = currentSubNames;
        this.currentSubscriptions = {};
        currentSubNames.forEach(function (sub) {
            _this.currentSubscriptions[sub] = [];
        });
    }
    NewsletterSubscriber.prototype.update = function (subscriptionName, currentArticles, unsubscribe) {
        this.currentSubscriptions[subscriptionName] = currentArticles;
        if (unsubscribe === true) {
            delete this.currentSubscriptions[subscriptionName];
        }
    };
    return NewsletterSubscriber;
}());
exports.NewsletterSubscriber = NewsletterSubscriber;
