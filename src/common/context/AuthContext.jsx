import { createContext, useState, useContext, useEffect } from "react";
import {
  registerRequest,
  loginRequest,
  verityTokenRequest,
  logoutUser,
  getProfileImage,
  getAllPublications,
  getPublications,
  getShareData
} from "../api/auth";
import { registerCompanyRequest, loginRequestCompany, verityTokenRequestCompany, getAllPublicationsCompany, logoutCompany } from "../api/auth.company";
export const AuthContext = createContext();
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be ussed within an AutProvider");
  }
  return context;
};
export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [publications, setPublications] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [profileImageCompany, setProfileImageCompany] = useState(null);
  const [isAuthenticatedCompany, setIsAuthenticatedCompany] = useState(false);
  const [loadingCompany, setLoadingCompany] = useState(true);
  const [companyData, setCompanyData] = useState(null);
  const [allPublications, setAllPublications] = useState([]);

  const signup = async (user) => {
    console.log(user);
    const res = await registerRequest(user);
    if (res.data) {
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(false);
    } else {
      console.log(res);
      if (res.response.data.message) {
        setErrors([[res.response.data.message]]);
        console.log(res.response.data.message);
      } else setErrors([res.response.data]);
    }
  };

  const signupCompany = async (company) => {
    const res = await registerCompanyRequest(company);
    if (res.data) {
      console.log(res.data);
      // setUser(res.data);
      // setIsAuthenticated(false);
      window.location.href = '/loginCompany'
    } else {
      console.log(res);
      if (res.response.data.message) {
        setErrors([[res.response.data.message]]);
        console.log(res.response.data.message);
      } else setErrors([res.response.data]);
    }
  };

  const signInCompany = async (company) => {
    const res = await loginRequestCompany(company);
    console.log(res.data);
    if (res.data) {
      console.log("entroooo");
      console.log(res);
      localStorage.setItem("tokenCompany", res.data.token);
      const resverify = await verityTokenRequest();
      console.log(resverify);
      const publications = [];
      const response = await getAllPublicationsCompany();
      console.log(response);
      response.data.publis.forEach((element) => {
        element.publications.forEach((publication) => {
          publications.push(publication);
        });
      });
      setAllPublications(publications);
      setIsAuthenticatedCompany(true);
      setCompanyData(res.data);
      setPublications(res.data.publications);
      setProfileImageCompany(res.data.profileImage);
    } else {
      console.log(res);
      setErrors([[res.response.data.message]]);
    }
  }

  const signIn = async (user) => {
    const res = await loginRequest(user);
    console.log(res.data);
    if (res.data) {
      console.log(res);
      localStorage.setItem("token", res.data.token);
      const resverify = await verityTokenRequest(res.data.token);
      console.log(resverify);
      setIsAuthenticated(true);
      setUser(res.data);
      setPublications(res.data.shares);
      setProfileImage(res.data.profileImage);
    } else {
      setErrors([[res.response.data.message]]);
    }
  };

  useEffect(() => {
    console.log("Pgshdssdsd", publications);
  }, [publications])

  const logoutUsers = async () => {
    try {
      await logoutUser();
      await getAllPublications();
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.log(error);
      if (Array.isArray(error.response.data)) {
        setErrors(error.response.data);
        console.log(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  const logoutCompanyData = async () => {
    try {
      logoutCompany();
      setIsAuthenticatedCompany(false);
      setCompanyData(null);
    } catch (error) {
      console.log(error);
      if (Array.isArray(error.response.data)) {
        setErrors(error.response.data);
        console.log(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  useEffect(() => {
    console.log(errors);
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  async function checkLogin() {
    const Token = localStorage.getItem("token");
    if (!Token) {
      setIsAuthenticated(false);
      setLoading(false);
      return setUser(null);
    } else {
      try {
        const res = await verityTokenRequest(Token);
        console.log(res.data);
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        } else {
          setUser(res.data);
          setIsAuthenticated(true);
          setLoading(false);
          const getImageProfile = await getProfileImage();
          setProfileImage(getImageProfile.data.profileImage);
          setTimeout(async() => {
            if (profileData) {
              setPublications(profileData.publications)
            }else {
              // const getShare = await getShareData();
              // console.log("Shareeee", getShare);
              // const getImageProfile = await getProfileImage();
              // setProfileImage(getImageProfile.data.profileImage);
              // setPublications(getShare.data.shares.reverse())
            }
          }, 3000);
        }
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    checkLogin();
  }, [isAuthenticated]);


  useEffect(() => {
    async function checkLoginCompany() {
      const Token = localStorage.getItem("tokenCompany");
      const TokenUser = localStorage.getItem("token");
      if (!Token) {
        setIsAuthenticatedCompany(false);
        setLoadingCompany(false);
        return setCompanyData(null);
      } else {
        try {
          const res = await verityTokenRequestCompany();
          console.log(res.data);
          if (!res.data) {
            setIsAuthenticatedCompany(false);
            setLoadingCompany(false);
            return;
          } else {
            // const getPublicationResponse = await getPublications();
            // const getImageProfile = await getProfileImage();
            // console.log(getPublicationResponse.data.publications);
            setPublications(res.data.publications.reverse());
            setProfileImageCompany(res.data.profileImage);
            setIsAuthenticatedCompany(true);
            setCompanyData(res.data);
            setLoadingCompany(false);
          }
        } catch (error) {
          console.log(error);
          setIsAuthenticatedCompany(false);
          setCompanyData(null);
          setLoadingCompany(false);
        }
      }
    }
    checkLoginCompany();
  }, [isAuthenticatedCompany]);

  useEffect(() => {
    async function allPublis() {
      const publications = [];
      const response = await getAllPublicationsCompany();
      console.log("Publis", response);
      response.data.publis.forEach((element) => {
        element.publications.forEach((publication) => {
          publications.push(publication);
        });
      });
      setAllPublications(publications.reverse());
    }

    allPublis()
  }, [isAuthenticated, isAuthenticatedCompany])

  useEffect(() => {
    if (profileData) {
      setPublications(profileData.publications)
    }
  }, [profileData])

  return (
    <AuthContext.Provider
      value={{
        signup,
        user,
        isAuthenticated,
        errors,
        signIn,
        loading,
        logoutUsers,
        setUser,
        setPublications,
        publications,
        profileImage,
        setProfileImage,
        profileData,
        setProfileData,

        // company
        checkLogin,
        signupCompany,
        signInCompany,
        isAuthenticatedCompany,
        loadingCompany,
        companyData,
        setCompanyData,
        profileImageCompany,
        setProfileImageCompany,
        setAllPublications,
        allPublications,
        logoutCompanyData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
