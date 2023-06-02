"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteAnonymizer = exports.PhoneAnonymizer = exports.EmailAnonymizer = void 0;
// just some example data for what a database request would do
var data = {
    contacts: [
        {
            id: '1',
            phone: '333',
            email: 'hello1@email.com'
        },
        {
            id: '2',
            phone: '392',
            email: 'hello2@email.com'
        },
        {
            id: '3',
            phone: '522',
            email: 'hello3@email.com'
        },
        {
            id: '4',
            phone: '123',
            email: 'hello4@email.com'
        }
    ],
    profiles: [
        {
            id: '1',
            contactId: '1',
            phone: '333',
            email: 'hello1@email.com'
        },
        {
            id: '2',
            contactId: '1',
            phone: '333',
            email: 'hello1@email.com'
        },
        {
            id: '3',
            contactId: '2',
            phone: '392',
            email: 'hello2@email.com'
        },
        {
            id: '4',
            contactId: '3',
            phone: '522',
            email: 'hello3@email.com'
        },
        {
            id: '5',
            contactId: '3',
            phone: '522',
            email: 'hello3@email.com'
        },
        {
            id: '6',
            contactId: '4',
            phone: '123',
            email: 'hello4@email.com'
        }
    ],
    notes: [
        {
            id: '10',
            profileId: '1',
            email_alt: 'hello1@email.com',
            note: 'some stuff'
        },
        {
            id: '11',
            profileId: '2',
            email_alt: 'hello1@email.com',
            note: 'some more stuff'
        },
        {
            id: '12',
            profileId: '4',
            email_alt: 'hello3@email.com',
            note: 'some other stuff'
        },
        {
            id: '13',
            profileId: '5',
            email_alt: 'hello3@email.com',
            note: 'some extra new stuff'
        }
    ]
};
var dataTransformation = function (matcher, data) {
    // return data[field.collection].filter((item:any) => item.id === matcher);
    // first get the profile:
    var profile = data.profiles.filter(function (p) { return p.id === matcher; });
    console.log('profile', profile);
    profile.forEach(function (p) {
        delete p.email;
    });
    //  then get the contact
    var contact = data.contacts.filter(function (c) { return c.id === profile[0].contactId; }).forEach(function (c) {
        delete c.email;
    });
    //  then get the notes
    var notes = data.notes.filter(function (n) { return n.profileId === matcher; }).forEach(function (n) {
        delete n.email_alt;
    });
};
// the concrete classes which implement different strategies.
var EmailAnonymizer = /** @class */ (function () {
    function EmailAnonymizer() {
        this.fields = [
            {
                collection: 'contacts',
                path: 'email'
            }, {
                collection: 'profiles',
                path: 'email'
            }, {
                collection: 'notes',
                path: 'email_alt'
            }
        ];
    }
    EmailAnonymizer.prototype.anonymize = function (profileId) {
        // main runtime for all associated email anonymizations that need to happen
        console.log('data before');
        console.log(data);
        console.log('data before');
        var results = dataTransformation(profileId, data);
        console.log('data after');
        console.log(data);
        console.log('data after');
    };
    return EmailAnonymizer;
}());
exports.EmailAnonymizer = EmailAnonymizer;
var PhoneAnonymizer = /** @class */ (function () {
    function PhoneAnonymizer() {
    }
    PhoneAnonymizer.prototype.anonymize = function () {
        // main runtime for all associated phone anonymizations that need to happen
    };
    return PhoneAnonymizer;
}());
exports.PhoneAnonymizer = PhoneAnonymizer;
var NoteAnonymizer = /** @class */ (function () {
    function NoteAnonymizer() {
    }
    NoteAnonymizer.prototype.anonymize = function () {
        // main runtime for all associated phone anonymizations that need to happen
    };
    return NoteAnonymizer;
}());
exports.NoteAnonymizer = NoteAnonymizer;
