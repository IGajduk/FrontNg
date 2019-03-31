import {Component, ElementRef, OnInit, ViewChild,
  ViewContainerRef, ComponentFactoryResolver, Renderer2, ComponentRef, ComponentFactory} from '@angular/core';

import {NgForm} from '@angular/forms';
import {Product} from '../../../../../models/Product';
import {ProductService} from '../../../../../services/product.service';
import {CategoriesService} from '../../../../../services/categories.service';
import {Category} from '../../../../../models/Category';
import {Producer} from '../../../../../models/Producer';
import {ProducersService} from '../../../../../services/producers.service';
import {Router} from '@angular/router';
import {appendChild, removeChild} from '@angular/core/src/render3/node_manipulation';
import {ImageCroppedEvent} from 'ngx-image-cropper';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {





  @ViewChild('firstColorHeight') firstColorHeightInput: ElementRef;
  @ViewChild('secondColorHeight') secondColorHeghtInput: ElementRef;
  @ViewChild('colorGlassOpacity') colorGlassOpacitiInput: ElementRef;
  @ViewChild('modalWindowCrop') modalWindCrop: ElementRef;
  @ViewChild('modalWindowWarning') modalWindWarn: ElementRef;
  @ViewChild('modalWindowGlassSettings') modalWindGlassSet: ElementRef;
  @ViewChild('colorPicker') colorPicker: ElementRef;
  @ViewChild('addNewColor') addNewColorBlock: ElementRef;
  @ViewChild('formProduct') formProduct: ElementRef;
  @ViewChild('pickedColorsList') pickedColorsList: ElementRef;
  @ViewChild('colorsList') colorsList: ElementRef;
  products: Product[] = [];
  categories: Category[] = [];
  producers: Producer[] = [];
  color: File;
  newProduct: any = {};
  imageChangedEvent: any = '';
  croppedImage: any = '';
  messages = ['hello', 'bye'];
  glassColor: any;
  idToAppentGlassColor: any;

  constructor(
    private renderer: Renderer2,
    private resolver: ComponentFactoryResolver,
    private categoriesService: CategoriesService,
    private productsService: ProductService,
    private producerService: ProducersService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.getProducts();
    this.getCategories();
    this.getProducers();

    addEventListener('change', (event: any) => {
      if (event.srcElement.id === 'addProductColorInput') {
        const colorId = this.idMaker();
        const productColor = event.target.value;
        this.createDivColorPicker(event, colorId, productColor);
        this.createDivColor(event, colorId, productColor);
        location.hash = `#${colorId}`;
      }

      if (event.target.id === 'type-of-colors-and-images-block') {
        const colorAndImages = document.getElementById('color-and-images');
        this.renderer.setStyle(colorAndImages, 'display', 'flex');
        this.renderer.setAttribute(event.target, 'disabled', 'disabled');
      }

      if (event.target === this.firstColorHeightInput.nativeElement ||
        event.target === this.secondColorHeghtInput.nativeElement ||
        event.target === this.colorGlassOpacitiInput.nativeElement) {
        this.checkGlassPreview(event);
      }
    });

    addEventListener('click', (e: any) => {

      if (e.srcElement.classList.contains('only-color')) {
        const rend = this.renderer;
        const prevFocus = document.getElementsByClassName('picked-color-focus')[0];
        const prevFocusedBlock = document.getElementsByClassName('focused-color-description')[0];
        if (prevFocus) {
          rend.removeClass(prevFocus, 'picked-color-focus');
        }
        const elemObj = e.srcElement as any;
        rend.addClass(rend.parentNode(e.target), 'picked-color-focus');
        if (prevFocusedBlock) {
          rend.removeClass(prevFocusedBlock, 'focused-color-description');
        }
       const focusedElemBlock = document.getElementById(e.target.colorId);

       rend.addClass(focusedElemBlock, 'focused-color-description');
      }

      if (e.srcElement.classList.contains('one-of-glass-color')) {
        const rend = this.renderer;
        if (rend.parentNode(e.target).classList.contains('focused-glass-color')) {
          console.log('ignor');
        } else {
          if (document.getElementsByClassName('focused-glass-color')[0]) {
            rend.removeClass(document.getElementsByClassName('focused-glass-color')[0], 'focused-glass-color');
          }
          rend.addClass(rend.parentNode(e.target), 'focused-glass-color');
          const blocksWhithImages = document.getElementsByClassName('glass-block-color-images');
          const prevFocusedBlock = document.getElementsByClassName('focused-block-with-glass-color-images')[0];
          if (prevFocusedBlock) {
          rend.removeClass(prevFocusedBlock, 'focused-block-with-glass-color-images');
          }
          for (let i = 0; i < blocksWhithImages.length; i++) {
            const imagesBlock = blocksWhithImages[i] as any;
           if (imagesBlock.glassColor === e.target.glassColor) {
             rend.addClass(blocksWhithImages[i], 'focused-block-with-glass-color-images');
           }
          }
        }
      }

      if (e.srcElement.classList.contains('lang-btn')) {
        if (e.target === document.getElementsByClassName('focused-lang-btn')[0]) {
        } else {
          this.changeLangBtn(e);
          this.showAnotherLanguageColorBlock();
          this.changeLanguageOnTitle();
        }
      }
    });
  }

  addGlassColorInputEvent(e: any) {
      this.glassColor = e.target.value;
      this.idToAppentGlassColor = e.target.parentId;
      this.renderer.setStyle(this.modalWindGlassSet.nativeElement, 'display', 'block');
      const firstColorHeight = this.firstColorHeightInput.nativeElement.value ? this.firstColorHeightInput.nativeElement.value : 50;
      const secondColorHeght = this.secondColorHeghtInput.nativeElement.value ? this.secondColorHeghtInput.nativeElement.value : 100;
      const colorGlassOpacity = this.colorGlassOpacitiInput.nativeElement.value ? this.colorGlassOpacitiInput.nativeElement.value : 50;
      document.getElementById('glassPresentation')
        .style.backgroundImage = `linear-gradient(to bottom, ${this.glassColor} ${firstColorHeight}%, #FFFFFE ${secondColorHeght}%)`;
      document.getElementById('glassPresentation')
        .style.filter = `opacity(${colorGlassOpacity}%)`;
  }

  сreateImageGlassBlock(id, glassColor, blockToAppend) {
    const rend = this.renderer;
    const rightBlockColor = rend.createElement('div');
    const prevFocusedBlock = document.getElementsByClassName('focused-block-with-glass-color-images')[0];
    if (prevFocusedBlock) {
    rend.removeClass(prevFocusedBlock, 'focused-block-with-glass-color-images');
    }
    rend.setAttribute(rightBlockColor, 'class', 'glass-block-color-images focused-block-with-glass-color-images');
    rend.appendChild(blockToAppend, rightBlockColor);
    rightBlockColor.glassColor = glassColor;

    const spanImagesTitleRu = rend.createElement('span');
    rend.setAttribute(spanImagesTitleRu, 'class', 'title-glass-color-images input-title-lang-ru');
    rend.appendChild(spanImagesTitleRu, rend.createText('Фотографии продукта выбраного цвета линз:'));
    rend.appendChild(rightBlockColor, spanImagesTitleRu);



    const spanImagesTitleEng = rend.createElement('span');
    rend.setAttribute(spanImagesTitleEng, 'class', 'title-glass-color-images input-title-lang-eng');
    rend.appendChild(spanImagesTitleEng, rend.createText('Images of product selected glasses color:'));
    rend.appendChild(rightBlockColor, spanImagesTitleEng);

    const colorImagesBlock = rend.createElement('div');
    rend.setAttribute(colorImagesBlock, 'class', 'color-glass-images-block');
    rend.appendChild(rightBlockColor, colorImagesBlock);

    colorImagesBlock.fatherId = id;
    console.log(colorImagesBlock.fatherId);

    const labelAddImg = rend.createElement('label');
    rend.setAttribute(labelAddImg, 'class', 'add-image-label');
    rend.appendChild(colorImagesBlock, labelAddImg);

    const addImg = rend.createElement('img');
    rend.setAttribute(addImg, 'src', 'http://localhost:3000/upload/icons/add.png');
    rend.appendChild(labelAddImg, addImg);
    addImg.glassColor = glassColor;

    const imgInput = rend.createElement('input');
    rend.setAttribute(imgInput, 'class', 'add-img-input');
    rend.setAttribute(imgInput, 'name', 'productColorImage');
    rend.setAttribute(imgInput, 'type', 'file');
    rend.listen(imgInput, 'change', (event) => {
      this.fileChangeEvent(event);
    });
    imgInput.glassColor = glassColor;
    rend.appendChild(labelAddImg, imgInput);

    const blockDeleteBtn = rend.createElement('div');
    rend.setAttribute(blockDeleteBtn, 'class', 'delete-glass-color-block');

    const deleteGlassBtn = rend.createElement('a');
    rend.setAttribute(deleteGlassBtn, 'class', 'delete-glass-color-button');
    rend.appendChild(deleteGlassBtn, rend.createText('Delete selected glass color'));
    rend.appendChild(blockDeleteBtn, deleteGlassBtn);
    rend.listen(deleteGlassBtn, 'click', (e) => {
      this.deleteProductGlassColor(e);
    });


    // <div class="delete-glass-color-block">
    // <a class="delete-glass-color-button">
    // Delete selected glass color
    // </a>
    // </div>






    rend.appendChild(rightBlockColor, blockDeleteBtn);

    const focusedLangBtn = document.getElementsByClassName('focused-lang-btn')[0];
    if (focusedLangBtn.classList.contains('ru-btn')) {
      rend.addClass(spanImagesTitleRu, 'focused-inp-title-lang');
    } else {
      rend.addClass(spanImagesTitleEng, 'focused-inp-title-lang');
    }

  }

  checkGlassPreview(event) {
    const glassPreview = document.getElementById('glassPresentation');
    const firstColorHeight = this.firstColorHeightInput.nativeElement.value;
    const secondColorHeght = this.secondColorHeghtInput.nativeElement.value;
    const colorGlassOpacity = this.colorGlassOpacitiInput.nativeElement.value ? this.colorGlassOpacitiInput.nativeElement.value : 50;
    glassPreview.style.backgroundImage = `linear-gradient(
                                                      to bottom,
                                                      ${this.glassColor} ${firstColorHeight}%,
                                                      #FFFFFE ${secondColorHeght}%
                                      )`;
    glassPreview.style.filter = `opacity(${colorGlassOpacity}%)`;
  }

  createNewGlassColorPicker(e) {
    const rend = this.renderer;
    const pickedGlassColor = rend.createElement('div');
    rend.setAttribute(pickedGlassColor, 'class', 'focused-glass-color glass-color-focus-picker');
    const prevFocusedGlassColor = document.getElementsByClassName('focused-glass-color')[0];
    const glassColor = rend.createElement('div');
    glassColor.glassColor = this.glassColor;
    if (prevFocusedGlassColor) {
      rend.removeClass(prevFocusedGlassColor, 'focused-glass-color');
    }
    const pickedGlassesColors = document.getElementsByClassName('picked-glass-colors') as any;
    for (let i = 0; i < pickedGlassesColors.length; i++) {
      const glassColorsBlock = pickedGlassesColors[i];
      if (glassColorsBlock.parentId === this.idToAppentGlassColor) {
        rend.appendChild(glassColorsBlock, pickedGlassColor);
        const blockToInsertImagesBlock = rend.parentNode(rend.parentNode(glassColorsBlock));
        this.сreateImageGlassBlock('id', glassColor.glassColor, blockToInsertImagesBlock);
      }
    }

    rend.addClass(glassColor, 'one-of-glass-color');
    rend.appendChild(pickedGlassColor, glassColor);
    const blockWhithGlassStyles = document.getElementById('glassPresentation');
    rend.setStyle(glassColor, 'backgroundImage', blockWhithGlassStyles.style.backgroundImage);
    rend.setStyle(glassColor, 'filter', blockWhithGlassStyles.style.filter);



    rend.setStyle(this.modalWindGlassSet.nativeElement, 'display', 'none');
    // this.blockWithColorGlassImagesCreate();
    this.glassColor = '';
  }

  blockWithColorGlassImagesCreate() {
    console.log('ok');
  }

  submitForm() {
    const rend = this.renderer;
    this.newProduct.colors = {};
    const blockWithImages = document.getElementsByClassName('color-images-block') as object;
    const imagesObj = document.getElementsByClassName('one-of-images') as object;
    for (let j = 0; j < document.getElementsByClassName('color-images-block').length; j++) {
      const id = blockWithImages[j].fatherId.split('#')[0];
      const colorPartOfId = blockWithImages[j].fatherId.split('#')[1];
      this.newProduct.colors[`${id}`] = {} as any;
      this.newProduct.colors[`${id}`].imagesBase64 = [];
      this.newProduct.colors[`${id}`].colorHash = `#${colorPartOfId}`;
    }
    console.log(this.formProduct);
    for (let i = 0; i < document.getElementsByClassName('one-of-images').length; i++) {
      const firstPartId = imagesObj[i].colorId.split('#')[0];
      if (this.newProduct.colors.hasOwnProperty(firstPartId)) {
        this.newProduct.colors[firstPartId].imagesBase64.push(imagesObj[i].src);
      }
    }
    const inputsObjectsArr = document.getElementsByClassName('input') as object;
    for (let i = 0; i < document.getElementsByClassName('input').length; i++) {
      if (inputsObjectsArr[i].fatherId) {
        const id = inputsObjectsArr[i].fatherId.split('#')[0];
        if (this.newProduct.colors.hasOwnProperty(id)) {
          this.newProduct.colors[`${id}`][`${inputsObjectsArr[i].name}`] = inputsObjectsArr[i].value;
        }
      }
    }
    console.log(this.formProduct);

    this.newProduct.title = this.formProduct.nativeElement[0].value;
    this.newProduct.category = this.formProduct.nativeElement[1].value;
    this.newProduct.producer = this.formProduct.nativeElement[2].value;
    this.newProduct.gender = this.formProduct.nativeElement[3].value;
    this.newProduct.show = this.formProduct.nativeElement[4].value;
    this.newProduct.about_all = this.formProduct.nativeElement[5].value;
    this.newProduct.about_short = this.formProduct.nativeElement[6].value;

    // this.newProduct
    this.productsService.createProduct(this.newProduct).subscribe((newProduct) => {

    });
    console.log(this.newProduct);
  }

  changeLangBtn(e) {
    const rend = this.renderer;
    const prevFocusBtn = document.getElementsByClassName('focused-lang-btn')[0];

    rend.removeClass(prevFocusBtn, 'focused-lang-btn');
    rend.addClass(e.srcElement, 'focused-lang-btn');
  }

  showAnotherLanguageColorBlock() {
    const rend = this.renderer;
    const prevFocusColorBlocks = document.getElementsByClassName('left-block-color-focus');
    const engFocusColorBlocks = document.getElementsByClassName('left-block-color-eng');
    const ruFocusColorBlocks = document.getElementsByClassName('left-block-color-ru');
    if (prevFocusColorBlocks[0]) {
      if (prevFocusColorBlocks[0].classList.contains('left-block-color-eng')) {
        for (let i = 0; i < engFocusColorBlocks.length; i++) {
          rend.removeClass(engFocusColorBlocks[i], 'left-block-color-focus');
          rend.addClass(ruFocusColorBlocks[i], 'left-block-color-focus');
        }
      } else {
        for (let i = 0; i < ruFocusColorBlocks.length; i++) {
          rend.removeClass(ruFocusColorBlocks[i], 'left-block-color-focus');
          rend.addClass(engFocusColorBlocks[i], 'left-block-color-focus');
        }
      }
    }
  }

  changeLanguageOnTitle() {
    const rend = this.renderer;
    const prevFocusTitleBlocks = document.getElementsByClassName('focused-inp-title-lang');
    const engFocusTitleBlocks = document.getElementsByClassName('input-title-lang-eng');
    const ruFocusTitleBlocks = document.getElementsByClassName('input-title-lang-ru');
    if (prevFocusTitleBlocks[0].classList.contains('input-title-lang-eng')) {
      for (let i = 0; i < engFocusTitleBlocks.length; i++) {
        rend.removeClass(engFocusTitleBlocks[i], 'focused-inp-title-lang');
        rend.addClass(ruFocusTitleBlocks[i], 'focused-inp-title-lang');
      }
    } else if (prevFocusTitleBlocks[0].classList.contains('input-title-lang-ru')) {
      for (let i = 0; i < ruFocusTitleBlocks.length; i++) {
        rend.removeClass(ruFocusTitleBlocks[i], 'focused-inp-title-lang');
        rend.addClass(engFocusTitleBlocks[i], 'focused-inp-title-lang');
      }
    }
  }

  fileChangeEvent(event: any): void {
    this.modalWindCrop.nativeElement.style.display = 'block';
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  imageLoaded() {
    // show cropper
  }

  loadImageFailed() {
    // show message
  }

createDivColorPicker(e, id, productColor) {
    const rend = this.renderer;
    const div = rend.createElement('div');
    const divColor = rend.createElement('div');
    const prevFocus = document.getElementsByClassName('picked-color-focus');
    if (prevFocus[0]) {
      rend.removeClass(prevFocus[0], 'picked-color-focus');
    }
    rend.setAttribute(div, 'class', 'one-of-colors-block-picker picked-color-focus');
    rend.setAttribute(divColor, 'class', 'only-color');
    rend.setStyle(divColor, 'background', productColor);
    divColor.productColor = e.target.value;
    divColor.colorId = id;
    console.log(divColor.colorId);
    rend.appendChild(div, divColor);
    rend.appendChild(this.pickedColorsList.nativeElement, div);
}

createDivColor(e, id, productColor) {
  const rend = this.renderer;
  const focusedLangBtn = document.getElementsByClassName('focused-lang-btn')[0];
    const prevFocusedBlock = document.getElementsByClassName('focused-color-description')[0];
    if (prevFocusedBlock) {
      rend.removeClass(prevFocusedBlock, 'focused-color-description');
    }
  const divMainBlock = rend.createElement('div');
  rend.setAttribute(divMainBlock, 'class', 'one-of-colors-block-descriptions');
  rend.setAttribute(divMainBlock, 'id', id);
  rend.addClass(divMainBlock, 'focused-color-description');



  const inputOfProductType = document.getElementById('type-of-colors-and-images-block') as any;

  // Block ENG starts
  const leftBlockColor = rend.createElement('div');
  rend.setAttribute(leftBlockColor, 'class', 'left-block-color-eng');
  rend.appendChild(divMainBlock, leftBlockColor);

  const iDCLCT = rend.createElement('div');
  rend.setAttribute(iDCLCT, 'class', 'input-div-color-left');
  rend.appendChild(leftBlockColor, iDCLCT);

  const inputColTit = rend.createElement('input');
  rend.setAttribute(inputColTit, 'class', 'input');
  rend.setAttribute(inputColTit, 'name', 'colorTitle');
  rend.setAttribute(inputColTit, 'type', 'text');
  rend.setAttribute(inputColTit, 'required', '');
  rend.appendChild(iDCLCT, inputColTit);
  inputColTit.fatherId = id;
  inputColTit.langInp = 'eng';

  const spanCT = rend.createElement('span');
  rend.setAttribute(spanCT, 'class', 'text-near-input');
  rend.appendChild(spanCT, rend.createText('Color Title'));
  rend.appendChild(iDCLCT, spanCT);

  const iDCLPrice = rend.createElement('div');
  rend.setAttribute(iDCLPrice, 'class', 'input-div-color-left');
  rend.appendChild(leftBlockColor, iDCLPrice);

  const inputPrice = rend.createElement('input');
  rend.setAttribute(inputPrice, 'class', 'input');
  rend.setAttribute(inputPrice, 'name', 'price');
  rend.setAttribute(inputPrice, 'type', 'text');
  rend.setAttribute(inputPrice, 'required', '');
  rend.appendChild(iDCLPrice, inputPrice);
  inputPrice.fatherId = id;
  inputPrice.langInp = 'eng';

  const spanPrice = rend.createElement('span');
  rend.setAttribute(spanPrice, 'class', 'text-near-input');
  rend.appendChild(spanPrice, rend.createText('Price'));
  rend.appendChild(iDCLPrice, spanPrice);

  const iDCLQuantity = rend.createElement('div');
  rend.setAttribute(iDCLQuantity, 'class', 'input-div-color-left');
  rend.appendChild(leftBlockColor, iDCLQuantity);

  const inputQuantity = rend.createElement('input');
  rend.setAttribute(inputQuantity, 'class', 'input');
  rend.setAttribute(inputQuantity, 'name', 'quantity');
  rend.setAttribute(inputQuantity, 'type', 'text');
  rend.setAttribute(inputQuantity, 'required', '');
  rend.appendChild(iDCLQuantity, inputQuantity);
  inputQuantity.fatherId = id;
  inputQuantity.langInp = 'eng';

  const spanQuantity = rend.createElement('span');
  rend.setAttribute(spanQuantity, 'class', 'text-near-input');
  rend.appendChild(spanQuantity, rend.createText('Quantity'));
  rend.appendChild(iDCLQuantity, spanQuantity);

  const iDCLSale = rend.createElement('div');
  rend.setAttribute(iDCLSale, 'class', 'input-div-color-left');
  rend.appendChild(leftBlockColor, iDCLSale);

  const inputSale = rend.createElement('input');
  rend.setAttribute(inputSale, 'class', 'input');
  rend.setAttribute(inputSale, 'name', 'sale');
  rend.setAttribute(inputSale, 'type', 'text');
  rend.setAttribute(inputSale, 'required', '');
  rend.appendChild(iDCLSale, inputSale);
  inputSale.fatherId = id;
  inputSale.langInp = 'eng';

  const spanSale = rend.createElement('span');
  rend.setAttribute(spanSale, 'class', 'text-near-input');
  rend.appendChild(spanSale, rend.createText('Sale'));
  rend.appendChild(iDCLSale, spanSale);
// Block ENG end
// Block rus starts
  const leftBlockColorRu = rend.createElement('div');
  rend.setAttribute(leftBlockColorRu, 'class', 'left-block-color-ru');
  rend.appendChild(divMainBlock, leftBlockColorRu);

  const iDCLCTru = rend.createElement('div');
  rend.setAttribute(iDCLCTru, 'class', 'input-div-color-left');
  rend.appendChild(leftBlockColorRu, iDCLCTru);

  const inputColTitRu = rend.createElement('input');
  rend.setAttribute(inputColTitRu, 'class', 'input');
  rend.setAttribute(inputColTitRu, 'name', 'colorTitle');
  rend.setAttribute(inputColTitRu, 'type', 'text');
  rend.setAttribute(inputColTitRu, 'required', '');
  rend.appendChild(iDCLCTru, inputColTitRu);
  inputColTitRu.fatherId = id;
  inputColTitRu.langInp = 'ru';

  const spanCTru = rend.createElement('span');
  rend.setAttribute(spanCTru, 'class', 'text-near-input');
  rend.appendChild(spanCTru, rend.createText('Название цвета'));
  rend.appendChild(iDCLCTru, spanCTru);

  const iDCLPriceRu = rend.createElement('div');
  rend.setAttribute(iDCLPriceRu, 'class', 'input-div-color-left');
  rend.appendChild(leftBlockColorRu, iDCLPriceRu);

  const inputPriceRu = rend.createElement('input');
  rend.setAttribute(inputPriceRu, 'class', 'input');
  rend.setAttribute(inputPriceRu, 'name', 'price');
  rend.setAttribute(inputPriceRu, 'type', 'text');
  rend.setAttribute(inputPriceRu, 'required', '');
  rend.appendChild(iDCLPriceRu, inputPriceRu);
  inputPriceRu.fatherId = id;
  inputPriceRu.langInp = 'ru';

  const spanPriceRu = rend.createElement('span');
  rend.setAttribute(spanPriceRu, 'class', 'text-near-input');
  rend.appendChild(spanPriceRu, rend.createText('Цена'));
  rend.appendChild(iDCLPriceRu, spanPriceRu);

  const iDCLQuantityRu = rend.createElement('div');
  rend.setAttribute(iDCLQuantityRu, 'class', 'input-div-color-left');
  rend.appendChild(leftBlockColorRu, iDCLQuantityRu);

  const inputQuantityRu = rend.createElement('input');
  rend.setAttribute(inputQuantityRu, 'class', 'input');
  rend.setAttribute(inputQuantityRu, 'name', 'quantity');
  rend.setAttribute(inputQuantityRu, 'type', 'text');
  rend.setAttribute(inputQuantityRu, 'required', '');
  rend.appendChild(iDCLQuantityRu, inputQuantityRu);
  inputQuantityRu.fatherId = id;
  inputQuantityRu.langInp = 'ru';

  const spanQuantityRu = rend.createElement('span');
  rend.setAttribute(spanQuantityRu, 'class', 'text-near-input');
  rend.appendChild(spanQuantityRu, rend.createText('Количество'));
  rend.appendChild(iDCLQuantityRu, spanQuantityRu);

  const iDCLSaleRu = rend.createElement('div');
  rend.setAttribute(iDCLSaleRu, 'class', 'input-div-color-left');
  rend.appendChild(leftBlockColorRu, iDCLSaleRu);

  const inputSaleRu = rend.createElement('input');
  rend.setAttribute(inputSaleRu, 'class', 'input');
  rend.setAttribute(inputSaleRu, 'name', 'sale');
  rend.setAttribute(inputSaleRu, 'type', 'text');
  rend.setAttribute(inputSaleRu, 'required', '');
  rend.appendChild(iDCLSaleRu, inputSaleRu);
  inputSaleRu.fatherId = id;
  inputSaleRu.langInp = 'ru';

  const spanSaleRu = rend.createElement('span');
  rend.setAttribute(spanSaleRu, 'class', 'text-near-input');
  rend.appendChild(spanSaleRu, rend.createText('Скидка'));
  rend.appendChild(iDCLSaleRu, spanSaleRu);

  const rightBlockColor = rend.createElement('div');
  rend.setAttribute(rightBlockColor, 'class', 'right-block-color');
  rend.appendChild(divMainBlock, rightBlockColor);
  console.log(inputOfProductType.value, 'input type of product');


  if (inputOfProductType.value === 'true') {
    const glassColorBlock = rend.createElement('div');
    rend.addClass(glassColorBlock, 'glassesColorBlock');
    rend.appendChild(rightBlockColor, glassColorBlock);

    const pickedGlassColors = rend.createElement('div');
    rend.addClass(pickedGlassColors, 'picked-glass-colors');
    rend.appendChild(glassColorBlock, pickedGlassColors);
    pickedGlassColors.parentId = id;
    console.log(pickedGlassColors.parentId);

    const addGlassNewColorBlockForInput = rend.createElement('div');
    rend.addClass(addGlassNewColorBlockForInput, 'addGlassesNewColor');
    rend.appendChild(glassColorBlock, addGlassNewColorBlockForInput);

    const labelForInput = rend.createElement('label');
    const idForInput = this.idMaker();
    rend.setAttribute(labelForInput, 'for', idForInput);
    rend.appendChild(addGlassNewColorBlockForInput, labelForInput);

    rend.setStyle(labelForInput, 'zIndex', '999');

    const imgAddGlassColor = rend.createElement('img');
    rend.setAttribute(imgAddGlassColor, 'src', 'http://localhost:3000/upload/icons/add.png');
    rend.addClass(imgAddGlassColor, 'addGlassesColorButton');
    rend.appendChild(labelForInput, imgAddGlassColor);

    const inputAddGlassColor = rend.createElement('input');
    rend.setAttribute(inputAddGlassColor, 'id', idForInput);
    rend.setAttribute(inputAddGlassColor, 'class', 'glassColorInput');
    rend.setAttribute(inputAddGlassColor, 'name', 'glassColor');
    rend.setAttribute(inputAddGlassColor, 'value', '#003310');
    rend.setAttribute(inputAddGlassColor, 'type', 'color');
    rend.listen(inputAddGlassColor, 'change', (evnt) => {
      this.addGlassColorInputEvent(evnt);
    });
    inputAddGlassColor.parentId = id;
    rend.appendChild(labelForInput, inputAddGlassColor);

    const spanRusTitleGlass = rend.createElement('span');
    rend.setAttribute(spanRusTitleGlass, 'class', 'title-colors-block input-title-lang-ru');
    rend.appendChild(spanRusTitleGlass, rend.createText('Цвета линз'));
    rend.appendChild(glassColorBlock, spanRusTitleGlass);

    const spanEngTitleGlass = rend.createElement('span');
    rend.setAttribute(spanEngTitleGlass, 'class', 'title-colors-block input-title-lang-eng');
    rend.appendChild(spanEngTitleGlass, rend.createText('Glasses colors'));
    rend.appendChild(glassColorBlock, spanEngTitleGlass);

    if (focusedLangBtn.classList.contains('ru-btn')) {
      rend.addClass(spanRusTitleGlass, 'focused-inp-title-lang');
    } else {
      rend.addClass(spanEngTitleGlass, 'focused-inp-title-lang');
    }



    // <div class="glassesColorBlock">
    // <div class="picked-glass-colors">
    // <div class="glass-color-focus-picker focused-glass-color">
    // <div class="one-of-glass-color">
    //   </div>
    //   </div>
    //   </div>
    //   <div class="addGlassesNewColor">
    //   <label for="addGlassColor">
    // <img src="http://localhost:3000/upload/icons/add.png" class="addGlassesColorButton" alt="add color">
    //   </label>
    //   <input name="glassColor" id="addGlassColor" class="glassColorInput" type="color" value="#003310">
    //   </div>
    //
    //   </div>
    //   <span class="title-colors-block input-title-lang-ru focused-inp-title-lang">Цвета линз</span>
    // <span class="title-colors-block input-title-lang-eng">Glasses colors</span>

  } else if (inputOfProductType.value === 'false') {
    const spanImagesTitleRu = rend.createElement('span');
    rend.setAttribute(spanImagesTitleRu, 'class', 'title-color-images input-title-lang-ru');
    rend.appendChild(spanImagesTitleRu, rend.createText('Фотографии продукта выбраного цвета'));
    rend.appendChild(rightBlockColor, spanImagesTitleRu);

    const spanImagesTitleEng = rend.createElement('span');
    rend.setAttribute(spanImagesTitleEng, 'class', 'title-color-images input-title-lang-eng');
    rend.appendChild(spanImagesTitleEng, rend.createText('Images of product selected color'));
    rend.appendChild(rightBlockColor, spanImagesTitleEng);

    const colorImagesBlock = rend.createElement('div');
    rend.setAttribute(colorImagesBlock, 'class', 'color-images-block');
    rend.appendChild(rightBlockColor, colorImagesBlock);
    colorImagesBlock.fatherId = id;
    console.log(colorImagesBlock.fatherId);

    const labelAddImg = rend.createElement('label');
    rend.setAttribute(labelAddImg, 'class', 'add-image-label');
    rend.appendChild(colorImagesBlock, labelAddImg);

    const addImg = rend.createElement('img');
    rend.setAttribute(addImg, 'src', 'http://localhost:3000/upload/icons/add.png');
    rend.appendChild(labelAddImg, addImg);

    const imgInput = rend.createElement('input');
    rend.setAttribute(imgInput, 'class', 'add-img-input');
    rend.setAttribute(imgInput, 'name', 'productColorImage');
    rend.setAttribute(imgInput, 'type', 'file');
    rend.listen(imgInput, 'change', (event) => {
      this.fileChangeEvent(event);
    });
    rend.appendChild(labelAddImg, imgInput);

    if (focusedLangBtn.classList.contains('ru-btn')) {
      rend.addClass(spanImagesTitleRu, 'focused-inp-title-lang');
    } else {
      rend.addClass(spanImagesTitleEng, 'focused-inp-title-lang');
    }
// Block rus end
}



  const deleteColorBlock = rend.createElement('div');
  rend.setAttribute(deleteColorBlock, 'class', 'delete-color');
  rend.appendChild(divMainBlock, deleteColorBlock);

  const deleteColorButtonRu = rend.createElement('div');
  rend.setAttribute(deleteColorButtonRu, 'class', 'delete-color-picker input-title-lang-ru');
  rend.appendChild(deleteColorButtonRu, rend.createText('Удалить выбранный цвет'));
  rend.listen(deleteColorButtonRu, 'click', (event) => {
    this.deleteProductColor(id);
  });
  rend.appendChild(deleteColorBlock, deleteColorButtonRu);

  const deleteColorButtonEng = rend.createElement('div');
  rend.setAttribute(deleteColorButtonEng, 'class', 'delete-color-picker input-title-lang-eng');
  rend.appendChild(deleteColorButtonEng, rend.createText('Delete selected color'));
  rend.listen(deleteColorButtonEng, 'click', (event) => {
    this.deleteProductColor(id);
  });
  rend.appendChild(deleteColorBlock, deleteColorButtonEng);


  if (focusedLangBtn.classList.contains('ru-btn')) {
    rend.addClass(deleteColorButtonRu, 'focused-inp-title-lang');
    rend.addClass(leftBlockColorRu, 'left-block-color-focus');
  } else {
    rend.addClass(deleteColorButtonEng, 'focused-inp-title-lang');
    rend.addClass(leftBlockColor, 'left-block-color-focus');
  }

  rend.appendChild(this.colorsList.nativeElement, divMainBlock);
}

deleteProductGlassColor(e) {
  if (confirm('You sure, you want to delete color?')) {
    const rend = this.renderer;
    const pickedGlassPicker = document.getElementsByClassName('focused-glass-color')[0];
    const pickedBlockWithGlassImages = document.getElementsByClassName('focused-block-with-glass-color-images')[0];
    pickedGlassPicker.remove();
    pickedBlockWithGlassImages.remove();
  }
}

deleteProductColor(id) {
    if (confirm('You sure, you want to delete color?')) {
      const rend = this.renderer;
      document.getElementById(id).remove();
      const pickerBlock = document.getElementsByClassName('picked-color-focus')[0];
      pickerBlock.remove();
    }
}

deleteColorImage(e) {
  if (confirm('You sure, you want to delete image?')) {
    const rend = this.renderer;
    rend.parentNode(rend.parentNode(e.target)).remove();
  }
}

destroyModalWindow(event) {
  this.modalWindCrop.nativeElement.style.display = 'none';
}


saveCroppedImg(event) {
  this.createImgElem();
  this.modalWindCrop.nativeElement.style.display = 'none';
}


destroyWarningModalWindow(event) {
  this.renderer.setStyle(this.modalWindWarn.nativeElement, 'display', 'none');
}

destroyGlassSettingsModalWindow(event) {
  this.renderer.setStyle(this.modalWindGlassSet.nativeElement, 'display', 'none');
}

createImgElem() {
  const rend = this.renderer;
  const insertBeforeThisElem = rend.parentNode(this.imageChangedEvent.target);
  const img = rend.createElement('img');
  rend.setAttribute(img, 'src', this.croppedImage);
  rend.setAttribute(img, 'class', 'one-of-images');
  img.colorId = document.getElementsByClassName('focused-color-description')[0].id;
  const delImg = rend.createElement('img');
  rend.setAttribute(delImg, 'src', 'http://localhost:3000/upload/icons/close-menu.png');
  rend.setAttribute(delImg, 'class', 'delete-img-btn');
  rend.listen(delImg, 'click', (event) => {
    this.deleteColorImage(event);
  });
  const divPosRel = rend.createElement('div');
  rend.setAttribute(divPosRel, 'class', 'position-relative');
  const divImg = rend.createElement('div');
  rend.setAttribute(divImg, 'class', 'div-img');

  rend.appendChild(divPosRel, img);
  rend.appendChild(divPosRel, delImg);
  rend.appendChild(divImg, divPosRel);
  rend.insertBefore(rend.parentNode(insertBeforeThisElem), divImg, insertBeforeThisElem);
  if (insertBeforeThisElem.lastChild.glassColor) {
    img.glassColor = insertBeforeThisElem.lastChild.glassColor;
  }
}

private getProducts() {
  this.productsService.getAll().subscribe((res) => {
    this.products = res ? res : [];
  });
}

removeProduct(product: Product) {
  this.productsService.delete(product._id).subscribe(() => {
    this.getProducts();
  });
}
// createProduct(productForm: NgForm) {
//   this.productsService.create(productForm.value).subscribe((newProduct) => {
//    this.products.push(newProduct);
//     this.router.navigate([`images/${newProduct._id}`], {});
//   });
// }

private getCategories() {
    this.categoriesService.getAll().subscribe((res: any) => {
      this.categories = res.result ? res.result : [];
    });
}
  private getProducers() {
    this.producerService.getAllProducers().subscribe((res: any) => {
      this.producers = res ? res : [];
    });
  }

  private idMaker() {

    return `${new Date().getDate() * new Date().getMonth() * new Date().getHours() *
    new Date().getMinutes() * new Date().getMilliseconds() * new Date().getFullYear()}`;
  }
}


