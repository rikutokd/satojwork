// Photo list.
// Each entry: [file name (without extension), category, width, height]
// Web images live in photos/thumb/ (for lists) and photos/large/ (for enlarged view).
// Order of categories here = order of filters and of the home page sport tiles.
// The first photo of each category is its cover on the home page.
// To add a photo, generate both sizes (see README) and add one line here.
window.PHOTOS = [
    ["swimming-1", "swimming", 2400, 1600],
    ["swimming-2", "swimming", 2400, 1600],
    ["swimming-3", "swimming", 1949, 1317],
    ["swimming-4", "swimming", 2400, 1621],
    ["swimming-5", "swimming", 2400, 1622],
    ["swimming-6", "swimming", 2400, 1600],
    ["rugby-7", "rugby", 2400, 1600],
    ["rugby-1", "rugby", 2400, 1599],
    ["rugby-2", "rugby", 2400, 1596],
    ["rugby-3", "rugby", 2400, 1800],
    ["rugby-4", "rugby", 2400, 1599],
    ["rugby-5", "rugby", 1475, 2213],
    ["rugby-6", "rugby", 2400, 1600],
    ["rowing-1", "rowing", 2400, 1600],
    ["rowing-2", "rowing", 2400, 1600],
    ["rowing-3", "rowing", 2400, 1622],
    ["rowing-4", "rowing", 2400, 1599],
    ["triathlon-1", "triathlon", 1754, 2400],
    ["triathlon-2", "triathlon", 1814, 1209],
    ["triathlon-3", "triathlon", 2400, 1600],
    ["triathlon-4", "triathlon", 2400, 1601],
    ["basketball-1", "basketball", 1600, 2400],
    ["basketball-9", "basketball", 1600, 2400],
    ["basketball-10", "basketball", 1622, 2400],
    ["basketball-11", "basketball", 1604, 2400],
    ["hockey-1", "hockey", 2400, 1599],
    ["hockey-2", "hockey", 2400, 1828],
    ["hockey-3", "hockey", 2400, 1622],
    ["skate-1", "skate", 1685, 1123],
    ["skate-2", "skate", 2400, 1621],
    ["skate-4", "skate", 2400, 1622],
    ["other-1", "other", 2400, 1600],
    ["other-2", "other", 2400, 1600],
    ["other-3", "other", 1600, 2400],
    ["other-4", "other", 2400, 1622],
    ["other-5", "other", 2400, 1622],
].map(([id, category, width, height]) => ({ id, category, width, height }));
