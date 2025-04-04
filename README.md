# Gallery-Gaze

> An easy-to-use navigator of the Metropolitan Museum of Art's Open Access Collection.

With data for more than 470,000 objects, spanning over 5,000 years of art, *Gallery Gaze* provides a simple navigator for the Metropolitan Museum of Art's Open Access Collection's datasets, utilizing its [Collection API](https://metmuseum.github.io/). *Gallery Gaze* allows users to browse the collection's departments locally, providing the object's image (when available) and label with information about the artist, title, date, medium, dimensions, and credit line.

<div align="center"><a href="#installation">Installation</a>・<a href="#usage">Usage</a>・<a href="#roadmap">Roadmap</a>・<a href="#credits">Credits</a></div>

## Installation
This project requires [Node.js](https://nodejs.org/en/) version 18+, which includes [npm](https://www.npmjs.com). To verify the version currently available, try running the following commands.

```
node -v
npm -v
```  
1. Clone the repository
```
git clone https://github.com/hccleveland/gallery-gaze.git
```

2. Install dependencies from `frontend`
```
cd frontend
npm install
```

3. Run the client
```
npm run dev
```

4. Open http://localhost:5173/ in the browser

<p align="right">(<a href="#gallery-gaze">back to top</a>)</p>

## Usage
**Choosing a Department**\
Departments are selectable by dropdown from hovering over "Choose a Collection" in the Navbar. The current department can be switched at any time. 

**Navigating Within a Department**\
While in a department, the current object and total object numbers are displayed above. The left and right buttons navigate to the next and previous object in the collection. There are also options in the top right to set navigation to "ordered" and "randomized". Ordered will navigate the objects one-by-one. Randomized will progress by a random number limited to a proportion of the department's size.  

**Returning to the Introduction Screen**\
Clicking on the *Gallery Gaze* button will return you to the Introduction page.

<p align="right">(<a href="#gallery-gaze">back to top</a>)</p>

## Roadmap
- [ ] Integrate API Search Functionality
- [ ] Add Users
    - [ ] Add Users DB
    - [ ] Add Authentication
- [ ] Add User Display Information Settings
    - [ ] Set Default Settings
    - [ ] Add Label Options
    - [ ] Add Settings Page
- [ ] Add User Personal Collection
    - [ ] Add Favorites System
    - [ ] Add Personal Collection Department

<p align="right">(<a href="#gallery-gaze">back to top</a>)</p>

## Credits
The artwork dataset and companion images are from the Metropolitan Museum of Art, New York. All label information comes from the Metropolitan Museum of Art Collection API; images from [www.metmuseum.org](www.metmuseum.org) as part of their Open Access policy. More information about this collection and their terms can be found below:

*The Metropolitan Museum of Art's Terms and Conditions* - https://www.metmuseum.org/policies/terms-and-conditions \
*The Metropolitan Museum of Art's Image and Data Resources* - https://www.metmuseum.org/policies/image-resources \
*Image and Data Resources FAQs* - https://www.metmuseum.org/policies/frequently-asked-questions-image-and-data-resources \
*The Metropolitan Museum of Art Collection API* - https://metmuseum.github.io/

This project and its author are in **no way** connected to, affiliated with, associated with, or endorsed by the Metropolitan Museum of Art.

This is an independent project that utilizes the Collection API and connected images for display. Individual object credit lines are also displayed at the bottom of the label information for the currently active object.

<p align="right">(<a href="#gallery-gaze">back to top</a>)</p>
