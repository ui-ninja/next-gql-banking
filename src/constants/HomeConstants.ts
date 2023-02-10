import {
  FiCreditCard,
  FiDollarSign,
  FiHome,
  FiList,
  FiPackage,
  FiTarget,
} from "react-icons/fi";

const description =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit Cupiditate obcaecati consequatur.";

const HomeConstants = {
  heroBanner: {
    heading: "Shop smart and safely with a NextGen choice account",
    subHeading:
      "Open a NextGen account and get a Digi Card, with dynamic CVC that refreshes every 24 hours.",
  },

  featureCards: {
    heading: "Much more with us!",
    features: [
      {
        heading: "Home loans",
        description,
        link: "#",
        icon: FiHome,
      },
      {
        heading: "Bank Accounts",
        description,
        link: "#",
        icon: FiDollarSign,
      },
      {
        heading: "Credit cards",
        description,
        link: "#",
        icon: FiCreditCard,
      },
      {
        heading: "Personal loans",
        description,
        link: "#",
        icon: FiTarget,
      },
      {
        heading: "Business",
        description,
        link: "#",
        icon: FiPackage,
      },
      {
        heading: "More options",
        description,
        link: "#",
        icon: FiList,
      },
    ],
  },
};

export default HomeConstants;
