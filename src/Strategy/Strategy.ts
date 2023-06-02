interface Strategy {
  anonymize(profileId: string): void;
}

type CollectionField = { collection: string, path: string };

// just some example data for what a database request would do
const data: any = {
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
}

const dataTransformation = (matcher: string, data: any) => {
  // return data[field.collection].filter((item:any) => item.id === matcher);
  // first get the profile:
  const profile = data.profiles.filter((p:any) => p.id === matcher)
  console.log('profile', profile)

  profile.forEach((p:any) => {
    delete p.email;
  })
  //  then get the contact
  const contact = data.contacts.filter((c:any) => c.id === profile[0].contactId).forEach((c:any) => {
    delete c.email;
  })
  //  then get the notes
  const notes = data.notes.filter((n:any) => n.profileId === matcher).forEach((n:any) => {
    delete n.email_alt;
  })

}

// the concrete classes which implement different strategies.

class EmailAnonymizer implements Strategy {
  private fields: CollectionField[]
  constructor(){
    this.fields = [
      {
        collection:'contacts',
        path: 'email'
      }, {
        collection:'profiles',
        path: 'email'
      }, {
        collection:'notes',
        path: 'email_alt'
      }
    ]
  }

  anonymize(profileId: string): void {
    // main runtime for all associated email anonymizations that need to happen
    console.log('data before');
    console.log(data);
    console.log('data before');
    const results = dataTransformation(profileId, data);
    console.log('data after');
    console.log(data);
    console.log('data after');
  }
}


class PhoneAnonymizer implements Strategy {
  constructor(){
  }

  anonymize(): void {
    // main runtime for all associated phone anonymizations that need to happen
  }
}
class NoteAnonymizer implements Strategy {
  constructor(){
  }

  anonymize(): void {
    // main runtime for all associated phone anonymizations that need to happen
  }
}

export {
  Strategy,
  EmailAnonymizer,
  PhoneAnonymizer,
  NoteAnonymizer
}
