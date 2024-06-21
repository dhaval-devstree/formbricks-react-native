import React, { useCallback, useEffect, useSyncExternalStore } from "react";

import { TRNConfigInput } from "@formbricks/types/react-native";

import { SurveyWebView } from "./SurveyWebView";
import { init } from "./lib";
import { SurveyStore } from "./lib/surveyStore";

type FormbricksProps = {
  initializationConfig: TRNConfigInput;
};

const surveyStore = SurveyStore.getInstance();

export const Formbricks = ({ initializationConfig }: FormbricksProps) => {
  // initializes sdk
  useEffect(() => {
    init({
      environmentId: initializationConfig.environmentId,
      apiHost: initializationConfig.apiHost,
      debug: initializationConfig.debug,
      userId: initializationConfig.userId,
      attributes: initializationConfig.attributes,
    });
  }, [initializationConfig]);

  const subscribe = useCallback((callback: () => void) => {
    const unsubscribe = surveyStore.subscribe(callback);
    return unsubscribe;
  }, []);

  const getSnapshot = useCallback(() => surveyStore.getSurvey(), []);
  const survey = useSyncExternalStore(subscribe, getSnapshot);

  return survey ? <SurveyWebView survey={survey} /> : <></>;
};
