export const navigateToSubcategory = async ({
  text,
  baseRoute,
  navigate,
  setLoading,
  setError,
}) => {
  try {
    setLoading(true);
    setError(null);

    const searchWords = text.split(" ").slice(0, 2).join(" ").trim();
    console.log("Searching for:", searchWords);

    const response = await fetch(
      `https://api.lavisheventzz.com/api/subcategories/search/${encodeURIComponent(
        searchWords
      )}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.success && data.data && data.data.length > 0) {
      const subCategory = data.data[0];
      console.log("subCategory Response:", subCategory);
      if (!subCategory._id) {
        throw new Error("Invalid subcategory data: missing ID");
      }

      // const finalRoute =
      //   baseRoute === '/service' || baseRoute === '/service/'
      //     ? `/service/${subCategory._id}`
      //     : `${baseRoute}/${subCategory._id}`;

      const finalRoute =
        baseRoute === "/service" || baseRoute === "/service/"
          ? `/service/${subCategory.subCategory
              .split(" ")
              .map((word) => word.charAt(0).toLowerCase() + word.slice(1))
              .join("-")}/${subCategory._id}`
          : `${baseRoute}/${subCategory._id}`;

      console.log("Navigating to:", finalRoute);
      navigate(finalRoute);
    } else {
      setError(`No matching service found for "${searchWords}".`);
    }
  } catch (err) {
    console.error("Error fetching subcategory:", err);
    setError(err.message || "Failed to find service. Please try again.");
  } finally {
    setLoading(false);
  }
};
