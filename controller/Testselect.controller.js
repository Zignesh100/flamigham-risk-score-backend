import testselectschema from "../model/Testselect.modal";

export const getAllTestSelects = async (req, res) => {
  try {
    const testSelects = await testselectschema.find();
    res.status(200).json(testSelects);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createTestSelect = async (req, res) => {
  const { testname, isActive } = req.body;

  try {
    const newTestSelect = new testselectschema({
      testname,
      isActive,
    });

    const savedTestSelect = await newTestSelect.save();
    res.status(201).json(savedTestSelect);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// export const updateTestSelectById = async (req, res) => {
//   const { testname, isActive } = req.body;
//   const { id } = req.params;

//   try {
//     const updatedTestSelect = await TestSelect.findByIdAndUpdate(
//       id,
//       { testname, isActive },
//       { new: true }
//     );

//     res.status(200).json(updatedTestSelect);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

export const updateTestSelectById = async (req, res) => {
  const { testname, isActive } = req.body;
  const { id } = req.params;

  try {
    const testSelect = await testselectschema.findById(id);

    if (!testSelect) {
      return res.status(400).json({ msg: "Test select not found" });
    }

    // Toggle the isActive field
    testSelect.isActive = !testSelect.isActive;

    // Save the updated test select
    const updatedTestSelect = await testSelect.save();

    res.status(200).json(updatedTestSelect);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
