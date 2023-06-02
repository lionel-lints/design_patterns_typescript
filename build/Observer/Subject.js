"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Newsletter = void 0;
var Newsletter = /** @class */ (function () {
    function Newsletter(name, subscribers, articles) {
        this.name = name;
        this.subscribers = subscribers;
        this.articles = articles;
    }
    Newsletter.prototype.subscribeObserver = function (obs) {
        if (this.subscribers.indexOf(obs) === -1) {
            this.subscribers.push(obs);
            obs.update(this.name, this.articles, false);
        }
    };
    Newsletter.prototype.unsubscribeObserver = function (obs) {
        var obsInd = this.subscribers.indexOf(obs);
        if (obsInd !== -1) {
            this.subscribers.splice(obsInd, 1);
            obs.update(this.name, [], true);
        }
    };
    Newsletter.prototype.notifyObservers = function () {
        var _this = this;
        this.subscribers.forEach(function (obs) {
            obs.update(_this.name, _this.articles, false);
        });
    };
    Newsletter.prototype.getArticles = function () {
        return this.articles;
    };
    Newsletter.prototype.addArticle = function (article) {
        if (this.articles.indexOf(article) === -1) {
            this.articles.push(article);
            this.notifyObservers();
        }
    };
    Newsletter.prototype.removeArticle = function (article) {
        var artInd = this.articles.indexOf(article);
        if (artInd !== -1) {
            this.articles.splice(artInd, 1);
            this.notifyObservers();
        }
    };
    return Newsletter;
}());
exports.Newsletter = Newsletter;
