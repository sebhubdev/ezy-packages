export default {
  meta: {
    title: "About page",
  },
  content: {
    sections: [
      {
        name: "Hero",
        component: "Hero",
        data: {
          title: "Qui c'est moi",
          text: "Tout ce que vous devez savoir sur moi",
        },
        styles: {
          backgroundColor: "red",
          marginTop: "100px",
          padding: "20px 0",
          marginBottom: "50px",
        },
      },
    ],
  },
};
