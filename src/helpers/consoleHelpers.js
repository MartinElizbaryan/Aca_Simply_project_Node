import chalk from "chalk"

export const showDevelopersNames = () => {
  console.log(
    `\n` +
      chalk.bgWhite.black.bold.italic("Development Team:") +
      `\n` +
      chalk.greenBright.bold("Martin Elizbaryan") +
      `\n` +
      chalk.hex("#e1da0d").bold("Ani Avetisyan") +
      `\n` +
      chalk.magenta("Anahit Sargsyan") +
      `\n` +
      chalk.hex("#e1550d").bold("Artyom Harutunyan")
  )
}
