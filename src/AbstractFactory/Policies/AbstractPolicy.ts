type OptionsObject = { name: string };

type RootModel = {
  _id: string;
  save: <T>(resource: T) => Promise<T>;
  getProfiles: (Collection: string, filter: string, key: string) => ProfileId[];
  getPolicies: (Collection: string, filter: string, key: string) => PolicyId[];
};

interface AbstractPolicyFactory {
    createCollectionPolicy(model: RootModel,policyDetails: OptionsObject): AbstractCollectionPolicy;
    createAnonymizationPolicy(model: RootModel,policyDetails: OptionsObject): AbstractAnonymizationPolicy;
}
