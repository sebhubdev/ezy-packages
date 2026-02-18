export default {
  meta: {
    title: "Page not found",
  },
  content: {
    sections: [
      {
        name: "Hero",
        component: "Hero",
        data: {
          title: "Sorry the page doesn't exists",
          text: "here some or a lot of text",
          btn_label: "Go home !",
          btn_link: "/",
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
