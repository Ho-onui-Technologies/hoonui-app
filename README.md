<p><a target="_blank" href="https://app.eraser.io/workspace/SUU0xXIhVG8Q3muZH5DH" id="edit-in-eraser-github-link"><img alt="Edit in Eraser" src="https://firebasestorage.googleapis.com/v0/b/second-petal-295822.appspot.com/o/images%2Fgithub%2FOpen%20in%20Eraser.svg?alt=media&amp;token=968381c8-a7e7-472a-8ed6-4a6626da5501"></a></p>

# Ho'onui Technologies: Software Consulting Practice Website
## Overview
This repository contains the code for a full-stack application designed for a software consulting practice. The app features a responsive front-end built with NextJS, TypeScript, & Tailwind, and a robust backend powered by Supabase. It integrates Clerk for user authentication and uses webhooks to automate database synchronization.

## Software Architecture
![db_er_diagram](/.eraser/SUU0xXIhVG8Q3muZH5DH___sKBE7gxtknX4C1dnV5iZm5p6Y362___---figure---u7k3G_YwjC1iHfNFhXlgM---figure---6_jW1jlCro7d3j78c-LUvw.png "db_er_diagram")

## Built With
- [![Next][Next.js]][Next-url]: React Framework
- [![React][React.js]][React-url]: Front-end Library
- [![Tailwind CSS][Tailwind-CSS]][Tailwind-url]: CSS Framework
- [![Supabase][Supabase]][Supabase-url]: Cloud Database/Backend
- [![PostgreSQL][PostgreSQL]][PostgreSQL-url]: Database used in Supabase
- [![Vercel][Vercel]][Vercel-url]: Frontend infrastructure and hosting
## Features
- **Responsive Front-End Design**: Built using NextJS and TypeScript, ensuring a seamless user experience across various devices and browsers.
- **Secure Backend**: Utilizes Supabase for backend operations, providing a reliable and scalable cloud-based database.
- **User Authentication**: Integrated with Clerk to offer secure user login functionalities.
- **Automated Workflows**: Webhooks are used to sync databases between Clerk and Supabase, enhancing data consistency and operational efficiency.
### Clerk: User Authentication
We outsource user authentication to a service called Clerk. Clerk provides out of the box support for user authentication and management. In particular, we use Clerk for their allow-list feature which allows to only limit access to our application to only verified email addresses. 

- Webhooks Connection: We've integrated Clerk's authentication system with our Supabase databases using webhooks, ensuring real-time synchronization between user authentication states and our database records. This setup guarantees immediate updates in our databases corresponding to user activities in Clerk, like sign-ups or profile changes.
- Event processing code can be found in the pages/api/webhooks directory
### Supabase
Our project leverages Supabase for our cloud-based database. Integration with NextJS is as easy as adding a project URL and API key to environment variables. It also easily syncs with Clerk through the use of webhooks.

[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white

[Next-url]: https://nextjs.org/



[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB

[React-url]: https://reactjs.org/



[Tailwind-CSS]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white

[Tailwind-url]: https://tailwindcss.com/



[Supabase]: https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=white

[Supabase-url]: https://supabase.com/


<!--- Eraser file: https://app.eraser.io/workspace/SUU0xXIhVG8Q3muZH5DH --->