const Products = require("../models/ProductModel");
const Service = require("../models/ServiceModel");
const Admin = require("../models/AdminModel");
const functions = require("../functions/deleteImage");
const path = require('path');

// Load Package
module.exports.loadPackage = async (req, res) => {
    try {
        const id = req.query.id;
        const editpackage = await Service.findById({ _id: id });
        res.render('addProducts', { editpackage: editpackage,id:id });
    } catch (error) {
        console.log(error.message);
    }
}

// Add Package
module.exports.addProduct = async (req, res) => {
    try {
        let loginData = await Admin.find({});
        for (let i in loginData) {
            if (String(loginData[i]._id) === req.session.user_id) {
                if (loginData[i].is_admin == 1) {
                    const PackageData = new Products({
                        title: req.body.title,
                        image: req.files.find(file => file.fieldname === 'image') ? req.files.find(file => file.fieldname === 'image').filename : null,
                        //image:req.file.filename,
                        price: req.body.price,
                        description: req.body.description,
                        gallery_images: req.files.filter(file => file.fieldname === 'gallery_images').map(file => file.filename),
                        serviceId: req.body.serviceId,
                        is_active: req.body.is_active == "on" ? 1 : 0 
                    });
                    const savePackage = await PackageData.save();
                    if (savePackage) {
                        res.redirect(`/view-package?id=${PackageData.serviceId}`);
                    }
                    else {
                        res.render('addProducts', { message: 'Package Not Added' });
                    }
                } else {
                    req.flash('error', 'You have no access to add package , You are not super admin !! *');
                    return res.redirect('back');
                }
            }
        }

    } catch (error) {
        console.log(error.message);
    }
}

// View Package
module.exports.viewProducts = async (req, res) => {
    try {
        let loginData = await Admin.find({});
        const id = req.query.id;
        const editData = await Service.findById({ _id: id });
        const allPackages = await Products.find({ serviceId: id }).populate('serviceId');
        if (allPackages) {
            res.render('viewProducts', { package: allPackages, editData: editData,loginData:loginData });
        }
        else {
            console.log(error.message);
        }

    } catch (error) {
        console.log(error.message);
    }
}

// Edit Package
module.exports.editProducts = async (req, res) => {
    try {
        const id = req.query.id;
        const editData = await Products.findById({ _id: id }).populate('serviceId');
        if (editData) {
            res.render('editProducts', { package: editData });
        }
        else {
            res.render('editProducts', { message: 'Package Not Added' });
        }
    } catch (error) {
        console.log(error.message);
    }
}

// Update Package
module.exports.UpdateProducts = async (req, res) => {
    try {
        let loginData = await Admin.find({});
        for (let i in loginData) {
            if (String(loginData[i]._id) === req.session.user_id) {
                if (loginData[i].is_admin == 1) {
                    const id = req.body.packageId;
                    const serviceId = req.body.serviceId;
                    const packages = await Products.findById({_id:id});
                    packages.title = req.body.title;
                    packages.price= req.body.price,
                    packages.description = req.body.description;
                    if(req.file){
                        await functions.deleteImage(packages.image);
                        packages.image = req.file.filename;
                    }
                    await packages.save();
                    res.redirect(`/view-products?id=${serviceId}`);
            }
            else {
                req.flash('error', 'You have no access to update package , You are not super admin !! *');
                return res.redirect('back');
            }
        }
    }

} catch (error) {
        console.log(error.message);
    }
}

// Active status
module.exports.activeStatus = async(req,res) => {
    try {
        let loginData = await Admin.find({});
        for (let i in loginData) {
            if (String(loginData[i]._id) === req.session.user_id) {
                if (loginData[i].is_admin == 1) {
                    const packages = await Products.findById({_id: req.params.id});
                    packages.is_active = packages.is_active == 1 ? 0 : 1;
                    await packages.save();
                    res.redirect("/view-products");
                    return;
                } else {
                    req.flash('error', 'You have no access to change status of Package, You are not super admin !! *');
                    return res.redirect('back');
                }
            }
        }
    } catch (error) {
        console.error(error);
    }
}

// Delete Package
module.exports.deleteProducts = async (req, res) => {
    try {
        const id = req.query.id;
        const packages = await Products.findById(req.query.id);
        if (packages) {
            await functions.deleteImage(packages.image);
        }
        const delPackage = await Products.deleteOne({ _id: id });
        return res.redirect('back');
    } catch (error) {
        console.log(error.message);
    }
}

// View Gallery
module.exports.viewGallery = async (req, res) => {
    try {
        let loginData = await Admin.find({});
        for (let i in loginData) {
            if (String(loginData[i]._id) === req.session.user_id) {
                if (loginData[i].is_admin == 1) {
                    let gallery = await Products.findOne({ _id: req.query.id });
                    res.render("viewProductGallery", { gallery });
                } else {
                    req.flash('error', 'You have no access to view Gallery Images, You are not super admin !!*');
                    return res.redirect('back');
                }
            }
        }
    } catch (error) {
        console.error(error);
    }
}

// Edit Gallery
module.exports.editGallery = async (req, res) => {
    try {
        let loginData = await Admin.find({});
            for (let i in loginData) {
                if (String(loginData[i]._id) === req.session.user_id) {
                    if (loginData[i].is_admin == 1) {
                    const id = req.query.id;
                    const img = req.query.img;
                    const oldImg = await Products.findById({ _id: id});
                    res.render('editProductImage', { oldImg: oldImg, img: img });
                } else {
                    req.flash('error', 'You have no access to edit Gallery Images, You are not super admin !!*');
                    return res.redirect('back');
                }
            }
        }               

    } catch (error) {
        console.log(error.message);
    }
}

// Replace Image
module.exports.replaceImg = async (req, res) => {
    try {
        const id = req.query.id;
        console.log("id", id);
        const oldImg = req.query.img;
        console.log("oldImg", oldImg);
        if (req.file) {
            const newImg = req.file.filename;
            const result = await Products.updateOne(
                { _id: id },
                { $set: { "gallery_images.$[element]": newImg } },
                { arrayFilters: [{ "element": { $eq: oldImg } }] }
            );

            return res.redirect(`/view-prodcuts-gallery?id=${id}`);
        }
    } catch (error) {
        console.log(error.message);
    }
}

// Delete Image
module.exports.deleteImage = async (req, res) => {
    try {
        const galimgId = req.query.img;
        const id = req.query.id;
        const result = await Products.findByIdAndUpdate(id, {
            $pull: { gallery_images: galimgId }
        });
        return res.redirect('back');
    } catch (error) {
        console.log(error.message);
    }
}

// Add New Image
module.exports.addNewImage = async (req, res) => {
    try {
        //const galimgId = req.files['gallery_images'].map(file => file.filename);
        const galimgId = req.files.filter(file => file.fieldname === 'gallery_images').map(file => file.filename)
        const id = req.query.id;
        const result = await Products.findByIdAndUpdate(id, {$push: { gallery_images: { $each: galimgId } }});
        return res.redirect('back');
    } catch (error) {
        console.log(error.message);
    }
}