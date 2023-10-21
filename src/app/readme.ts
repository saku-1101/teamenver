export type readmeGeneratorProps = {
  manager: string | null
  isGit: string | null
}
export const readmeGenerator = ({ isGit }: readmeGeneratorProps) => {
  return `
  // 🚀 If you agree with the settings below, give the access to the execution file with \`chmod u+x create.sh\`, and then just type \`./create.sh\`  to start your Vite app with your settings.
  // In order to observe what contents were generated, stop the server with \`ctrl + C\` and type \`ls -a\` in the terminal.
  
  ${
    isGit
      ? `// 🐙🐱 For security reason, we're afraid we cannot execute the git command and connect to your repo on your behalf. \\
  // You can initialize the local repo and commit the init project on your preferred IDE using the commands generated below.`
      : ''
  }

  ${
    isGit === 'true'
      ? `// 🐙🐱 To initialize Github repository *********************************************

  # 1: Initialize the local repository (Please execute only once.)
  git init

  # 2: Staging all changes
  git add .

  # 3: Commit them to the local repository
  git commit -m "Initial commit"

  # 4: Create a remote repository using the name of \`your-repo\`
  
  # 5: Keep in mind to copy the created repo's URL as you'll use it in the next step.
  # The URL must be something like this: \`https://github.com/yourusername/your-repo.git\`

  # 6: Register the remote repository to the local
  git remote add origin https://github.com/yourusername/your-repo.git

  # Push all
  git push -u origin main`
      : ''
  }`
}
