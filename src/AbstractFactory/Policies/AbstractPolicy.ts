type OptionsObject = { name: string };

type RootModel = {
  _id: string;
  save: <T>(resource: T) => Promise<T>;
  getProfiles: (Collection: string, filter: string, key: string) => string;
  getPolicies: (Collection: string, filter: string, key: string) => string;
};

interface AbstractPolicyFactory {
    createCollectionPolicy(model: RootModel,policyDetails: OptionsObject): string;
    createAnonymizationPolicy(model: RootModel,policyDetails: OptionsObject): string; //placeholder for compilation
}
