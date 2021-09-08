

type PipelineStage = {
  _id: string;
  isActive: boolean;
  text: string;
  automationWorkflowTriggerIds: string[];
  profileIds: string[];
  destinationProfileId?: string; // this id is where profileIds will be moved to
  destinationAutomationWorkflowTriggerId?: string; // where new triggers will be moved to
}
