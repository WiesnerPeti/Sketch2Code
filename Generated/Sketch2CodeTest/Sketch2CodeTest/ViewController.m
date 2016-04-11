//
//  ViewController.m
//  Sketch2CodeTest
//
//  Created by Peter Wiesner on 11/04/16.
//  Copyright © 2016 Peter Wiesner. All rights reserved.
//

#import "ViewController.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    _price = [[PriceView alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:@"Identifier"];
    [self.view addSubview:_price];
}

- (void)viewDidLayoutSubviews
{
    [super viewDidLayoutSubviews];
    
    [_price setFrame:CGRectMake(0, 100, self.view.bounds.size.width, 50)];
}

@end
