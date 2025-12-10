import httpApi from "@ezycore/utils/src/http/httpApi";

const loginHandler = (e) => {
  e.preventDefault();
  setLoading(true);
  const data = new FormData(form.current);
  services.users
    .login(data)
    .then((res) => {
      setError(null);

      console.log(res.data);
      const { userData, token } = res.data;
      if (!userData || !token) return;
      httpApi.defaults.headers.common["Authorization"] = token;
      if (typeof document != "undefined") {
        localStorage?.setItem("token", JSON.stringify(token));
      }
      onLogin(userData);
    })
    .catch((err) => {
      console.log(err);
      setError(err);
      setLoading(false);
    });
};

export default loginHandler;
