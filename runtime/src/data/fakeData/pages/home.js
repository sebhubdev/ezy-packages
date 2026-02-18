export default {
  meta: {
    title: "Home page",
  },
  content: {
    sections: [
      {
        name: "Hero",
        component: "Hero",
        data: {
          title: "Here start my super web site",
          text: "here some or a lot of text",
        },
        styles: {
          backgroundColor: "#554499",
          marginTop: "100px",
          padding: "20px 0",
          marginBottom: "50px",
        },
      },
    ],
  },
};
