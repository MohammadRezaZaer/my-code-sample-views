import {SettingsProvider, useSettings} from '@components/settings/settings.context';
import ErrorMessage from '@components/ui/error-message';
import PageLoader from '@components/ui/loaders/page-loader';
import { useServersQuery } from './settings.query';
import {useIsServerAvailableQuery} from "@framework/app/is-server-available.query";
import {useRouter} from "next/router";

export const AppSettings: React.FC = (props) => {

  const { data, isLoading: loading, error } = useServersQuery();
  if (loading) return <PageLoader />;
  if (error) return <ErrorMessage message={error.message} />;
  //console.log(data)



  return <SettingsProvider initialValue={data} {...props} />;
};
