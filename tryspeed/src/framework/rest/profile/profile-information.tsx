

const ProfileInformation = () => {
  const { t } = useTranslation('common');
  const { me } = useUser();
  const { mutate: updateProfile, isLoading: updating } =
    useUpdateUserMutation();

  function onSubmit(values: any) {
    if (!me) {
      return false;
    }
    updateProfile(
      {
        id: me.id,
        name: values.name,
        profile: {
          id: me?.profile?.id,
          ...values.profile,
          avatar: values.profile.avatar?.[0],
        },
      },
      {
        onSuccess: () => {
          toast.success(t('profile-update-successful'));
        },
      }
    );
  }

  return <ProfileForm loading={updating} onSubmit={onSubmit} user={me} />;
};

export default ProfileInformation;
