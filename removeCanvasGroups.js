// Class names for elements to be modified
LiClassName = "fOyUs_bGBk dxCCp_bGBk dxCCp_fLbg dxCCp_ycrn dxCCp_cfzP dxCCp_bCcs"; // List entries in group list
AClassName = "fOyUs_bGBk fbyHH_bGBk fbyHH_bSMN"; // Links to group pages

function observeNavTray() {
    try {
        // Select the node that will be observed for mutations
        const NavTrayPortal = document.getElementById("nav-tray-portal");

        // Options for the observer (which mutations to observe)
        const config = { attributes: false, childList: true, subtree: true };

        // Callback function to execute when mutations are observed
        const callback = function(mutationsList, observer) {
            // Get all group links
            groupLinks = document.getElementsByClassName(AClassName);

            // Give every entry a red border
            for (groupLink of groupLinks) {
                if (removeGroups.indexOf(groupLink.innerHTML) >= 0) {
                    console.log("Remove " + groupLink.innerHTML);
                    groupLink.parentNode.remove();
                }
                //groupLink.parentNode.remove();
            }
        }

        // Create an observer instance linked to the callback function
        const observer = new MutationObserver(callback);

        // Start observing the target node for configured mutations
        observer.observe(NavTrayPortal, config);

        // Later, you can stop observing
        //observer.disconnect();
    } catch(e) {
        console.error(e.message);
    }
};

// List of group names to be removed
var removeGroups = [];

// If stored entries could not be restored
function onError(error) {
    console.error(error.message);
}

// Create "removeGroups" from stored entries
function onGot(item) {
    removeGroups = item.groups;
}

let getting = browser.storage.sync.get(undefined);
getting.then(onGot, onError);

var groupsButton = document.getElementById("global_nav_groups_link");
groupsButton.onclick = observeNavTray;
