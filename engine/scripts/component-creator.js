const fsPromises = require("fs/promises");
const chalk = require("chalk");

const path = process.argv[3];
const componentName = process.argv[4];
const dest = `packages/ui/src/components/${path}/${componentName}`;
const spinalName = componentName
  .replace(/([a-z])([A-Z])/g, "$1-$2") // separa antes de mayúscula
  .toLowerCase();

const indexContent = `import ${componentName} from "./${componentName}";
export default ${componentName};`;

const componentContent = `import React from "react";


const ${componentName} = ({}) => {
  return <div className="${spinalName}">${componentName}</div>    
}
  
export default ${componentName};`;

const storiesTitle = path.charAt(0).toUpperCase() + path.slice(1);
const storiesContent = `import ${componentName} from "./${componentName}";

export default {
  title: "${storiesTitle}/${componentName}",
  component: ${componentName},
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export const Default = {
  args: {},
};`;

const sassContent = `
    .${spinalName} {}
`;

fsPromises
  .mkdir(`${dest}`, {
    recursive: true,
  })
  .then(() => {
    console.log(chalk.green.bold("Folder created!"));
  })
  .catch((err) => {
    console.log(err);
  });

async function createFiles() {
  try {
    await fsPromises.mkdir(`${dest}`, {
      recursive: true,
    });

    console.log(chalk.green.bold("Folder created!"));
    await fsPromises.writeFile(`${dest}/index.js`, indexContent);
    await fsPromises.writeFile(`${dest}/${componentName}.js`, componentContent);
    // await fsPromises.writeFile(
    //   `${dest}/${componentName}.stories.js`,
    //   storiesContent,
    // );
    await fsPromises.writeFile(`${dest}/${componentName}.scss`, sassContent);
  } catch (err) {
    console.log(err);
  }
}

createFiles().then(() => {
  import("boxen").then((res) => {
    const boxen = res.default;
    const msg = `
      ${chalk.bold(`Component ${componentName} created successfully`)}
      
      ${chalk.gray("Files created : ")}
    
      ${chalk.green(`index.js`)}
      ${chalk.green(`${componentName}.js`)}
      ${chalk.green(`${componentName}.stories.js`)}
      ${chalk.green(`${componentName.toLowerCase()}.scss`)}
    `;

    console.log(
      boxen(msg, {
        padding: 1,
        margin: 1,
        borderStyle: "double",
        borderColor: "whiteBright",
        title: "Component creator",
        textAlign: "left",
        textAlignment: "left",
      }),
    );
  });
});
