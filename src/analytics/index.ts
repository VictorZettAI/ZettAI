import ReactGA from 'react-ga4';

export const trackFormSubmission = (formName: string) => {
  ReactGA.event({
    category: 'Form',
    action: 'Submit',
    label: formName,
  });
};
