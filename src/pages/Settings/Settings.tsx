import React, { useState, useEffect } from "react";

import SettingsProfileTab from "../../components/SettingsProfileTab/SettingsProfileTab";
import SettingsEmailTab from "../../components/SettingsEmailTab/SettingsEmailTab";
import SettingsPasswordTab from "../../components/SettingsPasswordTab/SettingsPasswordTab";
import Spinner from "../../components/Spinner/Spinner";

import { Profile } from "../../types/profile.types";
import { axiosI, handleApiResponseError } from "../../api/axios";
import { useAuth } from "../../services/auth.serivce";
import PageWrapper from "../../components/PageWrapper/PageWrapper";

type Props = {};

const Settings = (props: Props) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState<Profile>();

  const tabs = ["Profile", "Email", "Password"];
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const renderTab = (tabIndex: number): React.ReactNode => {
    switch (tabIndex) {
      case 1:
        return <SettingsEmailTab userEmail={user!.email} />;
      case 2:
        return <SettingsPasswordTab />;
      default:
        return <SettingsProfileTab profileData={profileData!} />;
    }
  };

  useEffect(() => {
    const getProfileData = async () => {
      setLoading(true);

      await axiosI
        .get(`/profiles/${user!.username}`)
        .then((response) => setProfileData(response.data))
        .catch((err) => handleApiResponseError(err));

      setLoading(false);
    };

    getProfileData();
  }, []);

  return (
    <PageWrapper>
      <div className="tabs tabs-boxed">
        {tabs.map((title, i) => (
          <a
            className={`tab md:tab-lg ${selectedTab === i && "tab-active"}`}
            onClick={(e) => {
              setSelectedTab(i);
            }}
            key={`tab${i}}`}
          >
            {title}
          </a>
        ))}
      </div>
      {loading ? <Spinner /> : <div className="">{renderTab(selectedTab)}</div>}
    </PageWrapper>
  );
};

export default Settings;
