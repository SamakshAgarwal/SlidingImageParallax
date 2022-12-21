const list = document.getElementById("image-list");

onmousedown = (e) => {
  list.dataset.mouseDownAt = e.clientX;
};

onmousemove = (e) => {
  if (list.dataset.mouseDownAt == "0") return;
  const mouseDelta = parseFloat(list.dataset.mouseDownAt) - e.clientX,
    maxDelta = innerWidth / 2;

  const percentage = (mouseDelta / maxDelta) * -100,
    nextPercentageUnconstrained =
      parseFloat(list.dataset.prevPercentage) + percentage,
    nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

  list.dataset.percentage = nextPercentage;

  list.animate(
    {
      transform: `translate(${nextPercentage}%, -50%)`,
    },
    { duration: 1200, fill: "forwards" }
  );

  for (const image of document.getElementsByClassName("image")) {
    image.animate(
      {
        objectPosition: `${100 + nextPercentage}% center`,
      },
      { duration: 1200, fill: "forwards" }
    );
  }
};

onmouseup = (e) => {
  list.dataset.mouseDownAt = 0;
  list.dataset.prevPercentage = list.dataset.percentage;
};
