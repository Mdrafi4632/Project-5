# Web Development Project 5 - *Data Dashboard*

Submitted by: **Md Rafi**

This web app: **NYC Coffee Shops**

Time spent: **6** hours spent in total

## Required Features

The following **required** functionality is completed:

- [X] **The site has a dashboard displaying a list of data fetched using an API call**
  - The dashboard should display at least 10 unique items, one per row
  - The dashboard includes at least two features in each row
- [X] **`useEffect` React hook and `async`/`await` are used**
- [X] **The app dashboard includes at least three summary statistics about the data** 
  - The app dashboard includes at least three summary statistics about the data, such as:
    - *insert details here*
- [X] **A search bar allows the user to search for an item in the fetched data**
  - The search bar **correctly** filters items in the list, only displaying items matching the search query
  - The list of results dynamically updates as the user types into the search bar
- [X] **An additional filter allows the user to restrict displayed items by specified categories**
  - The filter restricts items in the list using a **different attribute** than the search bar 
  - The filter **correctly** filters items in the list, only displaying items matching the filter attribute in the dashboard
  - The dashboard list dynamically updates as the user adjusts the filter
    

The following **additional** features are implemented:

* [X] List anything else that you added to improve the site's functionality!
* [X] DONE button to trigger search manually (instead of live typing search)
* [X] Formatted phone numbers nicely (like (123) 456-7890 instead of just digits)
* [X] Grade Filter dropdown (A, B, C) to dynamically filter coffee shops
* [X] Health Score Guide Table explaining health grades
* [X] Top 10 popular coffee shops (Grade A) displayed by default
* [X] Basic light background texture for a soft coffee shop feeling

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='http://i.imgur.com/link/to/your/gif/file.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with ...  
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes
Managing the Search Bar Behavior:
It was challenging at first to control the search behavior so that the search would only happen after clicking the DONE button, not while typing. To fix this, I created a separate temporary search term (tempSearchTerm) and only updated the real search term (searchTerm) after clicking DONE.

Filtering Coffee Shops Dynamically:
Setting up multiple filters (search + grade) at the same time required careful logic to make sure both filters worked together without breaking the list.

Formatting Phone Numbers:
The raw data for phone numbers came as unformatted digits. I had to add a helper function to correctly format them as (xxx) xxx-xxxx to make the display cleaner and easier to read.

Design and Layout Alignment:
It took some effort to make sure the input box and DONE button were properly aligned on the same row, and the UI stayed responsive for different screen sizes.

Understanding the API Data:
Some coffee shops were missing certain fields (like phone number or grade). I had to handle missing data carefully using fallback text like "Not Available" to avoid breaking the page.

## License

    Copyright [2025] [Rafi]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
