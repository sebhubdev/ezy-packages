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
          title: "Contactez moi !",
          text: "Laissez moin un message dans le formulaire et je vous recontacterais au plus vite !!",
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
