const handleShare = async () => {
  const shareData = {
    title: "My Habit Progress 🌱",
    text: "I'm building eco-friendly habits with HabitLeaf!",
    url: window.location.href,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(shareData.url);
      alert("Link copied to clipboard!");
    }
  } catch (err) {
    console.error("Share failed:", err);
  }
};

export default handleShare;
